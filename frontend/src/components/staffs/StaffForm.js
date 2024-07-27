import React from "react";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import classes from "./StaffForm.module.css";

function StaffForm({ staff, method }) {
  const navigate = useNavigate();
  const isEditing = method === "PATCH";

  // Debugging: Log the staff prop to ensure it's received correctly
  console.log("Staff data:", staff);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let url = "http://localhost:8000/api/staffs";
    if (method === "PATCH") {
      url += `/${staff.staffno}`; // Use staff.staffno directly for PATCH requests
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.status === 422) {
        const data = await response.json();
        console.error(data.errors); // Handle validation errors
        return;
      }

      if (!response.ok) {
        throw new Error("Could not save staff");
      }

      navigate("/staffs");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form method={method} className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="staffno">Staff Number</label>
        <input
          id="staffno"
          type="text"
          name="staffno"
          required
          defaultValue={staff?.staffno || ""}
          readOnly={isEditing} // Make the input field read-only only for PATCH requests
        />
      </p>
      <p>
        <label htmlFor="fname">First Name</label>
        <input
          id="fname"
          type="text"
          name="fname"
          required
          defaultValue={staff?.fname || ""}
        />
      </p>
      <p>
        <label htmlFor="lname">Last Name</label>
        <input
          id="lname"
          type="text"
          name="lname"
          required
          defaultValue={staff?.lname || ""}
        />
      </p>
      <p>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          name="position"
          required
          defaultValue={staff?.position || ""}
        />
      </p>
      <p>
        <label htmlFor="sex">Sex</label>
        <input
          id="sex"
          type="text"
          name="sex"
          required
          defaultValue={staff?.sex || ""}
        />
      </p>
      <p>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          name="dob"
          required
          defaultValue={
            staff?.dob ? new Date(staff.dob).toISOString().split("T")[0] : ""
          }
        />
      </p>
      <p>
        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          type="number"
          name="salary"
          step="0.01"
          required
          defaultValue={staff?.salary || ""}
        />
      </p>
      <p>
        <label htmlFor="branchno">Branch Number</label>
        <input
          id="branchno"
          type="text"
          name="branchno"
          required
          defaultValue={staff?.branchno || ""}
        />
      </p>
      <p>
        <label htmlFor="telephone">Telephone Number</label>
        <input
          id="telephone"
          type="text"
          name="telephone"
          required
          defaultValue={staff?.telephone || ""}
        />
      </p>
      <p>
        <label htmlFor="mobile">Mobile Number</label>
        <input
          id="mobile"
          type="text"
          name="mobile"
          required
          defaultValue={staff?.mobile || ""}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={staff?.email || ""}
        />
      </p>
      {/* <p>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          name="image"
          defaultValue={staff?.image || ""}
        />
      </p> */}
      <div className={classes.actions}>
        <button type="button" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button type="submit">
          {method === "PATCH" ? "Update Staff" : "Create Staff"}
        </button>
      </div>
    </Form>
  );
}

export default StaffForm;

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  let url = "http://localhost:8000/api/staffs";
  if (method === "PATCH") {
    url += `/${params.staffno}`;
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: formData,
    });

    if (response.status === 422) {
      return response; // Return response to handle validation errors
    }

    if (!response.ok) {
      throw new Error("Could not save staff");
    }

    return redirect("/staffs");
  } catch (error) {
    console.error(error.message);
    throw json({ message: "Could not save staff" }, { status: 500 });
  }
}

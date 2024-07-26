import React from "react";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import classes from "./StaffForm.module.css";
import config from "../../config/config";

function StaffForm({ method, staff }) {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Prepare data for submission
    const staffData = {
      staffno: formData.get("staffno"),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      position: formData.get("position"),
      sex: formData.get("sex"),
      dob: formData.get("dob"),
      salary: formData.get("salary"),
      branchno: formData.get("branchno"),
      telephone: formData.get("telephone"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
    };

    let url = "http://localhost:8000/api/staffs";
    if (method === "PATCH") {
      url += `/${staffData.staffno}`;
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.status === 422) {
        const data = await response.json();
        // Handle validation errors
        console.error(data.errors);
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
          defaultValue={staff && staff.staffno}
        />
      </p>
      <p>
        <label htmlFor="fname">First Name</label>
        <input
          id="fname"
          type="text"
          name="fname"
          required
          defaultValue={staff && staff.fname}
        />
      </p>
      <p>
        <label htmlFor="lname">Last Name</label>
        <input
          id="lname"
          type="text"
          name="lname"
          required
          defaultValue={staff && staff.lname}
        />
      </p>
      <p>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          name="position"
          required
          defaultValue={staff && staff.position}
        />
      </p>
      <p>
        <label htmlFor="sex">Sex</label>
        <input
          id="sex"
          type="text"
          name="sex"
          required
          defaultValue={staff && staff.sex}
        />
      </p>
      <p>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          name="dob"
          required
          defaultValue={staff && staff.dob}
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
          defaultValue={staff && staff.salary}
        />
      </p>
      <p>
        <label htmlFor="branchno">Branch Number</label>
        <input
          id="branchno"
          type="text"
          name="branchno"
          required
          defaultValue={staff && staff.branchno}
        />
      </p>
      <p>
        <label htmlFor="telephone">Telephone</label>
        <input
          id="telephone"
          type="text"
          name="telephone"
          required
          defaultValue={staff && staff.telephone}
        />
      </p>
      <p>
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          type="text"
          name="mobile"
          required
          defaultValue={staff && staff.mobile}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={staff && staff.email}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button type="submit">Save</button>
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

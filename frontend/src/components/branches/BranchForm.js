import React from "react";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import classes from "./BranchForm.module.css";

// function BranchForm({ method, branch }) {
//   const navigate = useNavigate();

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     // Prepare data for submission
//     const branchData = {
//       branchno: formData.get("branchno"),
//       street: formData.get("street"),
//       city: formData.get("city"),
//       postcode: formData.get("postcode"),
//     };

//     let url = "http://localhost:8000/api/branches";
//     if (method === "PATCH") {
//       url += `/${branchData.branchno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         // Handle validation errors
//         console.error(data.errors);
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save branch");
//       }

//       navigate("/branches");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <Form method={method} className={classes.form} onSubmit={handleSubmit}>
//       <p>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           id="branchno"
//           type="text"
//           name="branchno"
//           required
//           defaultValue={branch && branch.branchno}
//         />
//       </p>
//       <p>
//         <label htmlFor="street">Street</label>
//         <input
//           id="street"
//           type="text"
//           name="street"
//           required
//           defaultValue={branch && branch.street}
//         />
//       </p>
//       <p>
//         <label htmlFor="city">City</label>
//         <input
//           id="city"
//           type="text"
//           name="city"
//           required
//           defaultValue={branch && branch.city}
//         />
//       </p>
//       <p>
//         <label htmlFor="postcode">Postcode</label>
//         <input
//           id="postcode"
//           type="text"
//           name="postcode"
//           required
//           defaultValue={branch && branch.postcode}
//         />
//       </p>
//       <div className={classes.actions}>
//         <button type="button" onClick={() => navigate("..")}>
//           Cancel
//         </button>
//         <button type="submit">Save</button>
//       </div>
//     </Form>
//   );
// }

// export default BranchForm;

// import React from "react";
// import { Form, useNavigate } from "react-router-dom";
// import classes from "./BranchForm.module.css"; // Ensure the correct path to the CSS module

function BranchForm({ branch, method }) {
  const navigate = useNavigate();
  const isEditing = method === "PATCH";

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let url = "http://localhost:8000/api/branches";
    if (method === "PATCH") {
      url += `/${formData.get("branchno")}`; // Use branchno from formData for PATCH requests
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
        throw new Error("Could not save branch");
      }

      navigate("/branches");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form method={method} className={classes.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="branchno">Branch Number</label>
        <input
          type="text"
          id="branchno"
          name="branchno"
          defaultValue={branch ? branch.branchno : ""}
          readOnly={isEditing} // Make the input field read-only during editing
        />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          defaultValue={branch ? branch.street : ""}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={branch ? branch.city : ""}
        />
      </div>
      <div>
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          defaultValue={branch ? branch.postcode : ""}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button type="submit">
          {isEditing ? "Update Branch" : "Create Branch"}
        </button>
      </div>
    </Form>
  );
}

export default BranchForm;

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  let url = "http://localhost:8000/api/branches";
  if (method === "PATCH") {
    url += `/${params.branchno}`;
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
      throw new Error("Could not save branch");
    }

    return redirect("/branches");
  } catch (error) {
    console.error(error.message);
    throw json({ message: "Could not save branch" }, { status: 500 });
  }
}

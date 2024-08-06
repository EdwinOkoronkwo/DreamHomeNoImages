// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   // Default staff object for creating a new staff
//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = staff || defaultStaff;

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {currentStaff.fname} {currentStaff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${staff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {staff.fname} {staff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={staff.staffno}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={staff.fname}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={staff.lname}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={staff.position}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={staff.sex}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={staff.dob.split("T")[0]} // Prepopulate with date value
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={staff.branchno}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={staff.salary}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={staff.telephone}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={staff.mobile}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={staff.email}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff = {}, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = { ...defaultStaff, ...staff };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {currentStaff.fname} {currentStaff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

/////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());

//     // Log the form data to the console
//     console.log(data);

//     let url = "http://localhost:8000/api/staffs";
//     if (isEditMode) {
//       url += `/${staff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: isEditMode ? "PATCH" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {staff.fname} {staff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={staff.staffno}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={staff.fname}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={staff.lname}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={staff.position}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={staff.sex}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={staff.dob.split("T")[0]} // Prepopulate with date value
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={staff.branchno}
//           readOnly
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={staff.salary}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={staff.telephone}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={staff.mobile}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={staff.email}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData.entries());

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff = {}, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = { ...defaultStaff, ...staff };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {isEditMode
//             ? `${currentStaff.fname} ${currentStaff.lname}`
//             : "New Staff"}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={isEditMode} // Read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={!isEditMode} // Editable in create mode, read-only in edit mode
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//           readOnly={isEditMode} // Editable in edit mode, read-only in create mode
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//           readOnly={isEditMode} // Editable in edit mode, read-only in create mode
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//           readOnly={isEditMode} // Editable in edit mode, read-only in create mode
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//           readOnly={isEditMode} // Editable in edit mode, read-only in create mode
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

//////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff = {}, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = { ...defaultStaff, ...staff };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {currentStaff.fname} {currentStaff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//           readOnly={!isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//           readOnly={false} // Editable field
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//           readOnly={false} // Editable field
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//           readOnly={false} // Editable field
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff = {}, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = { ...defaultStaff, ...staff };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {currentStaff.fname} {currentStaff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//           readOnly={false}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

// import React from "react";
// import { json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff = {}, isEditMode }) {
//   const navigate = useNavigate();
//   const method = isEditMode ? "PATCH" : "POST";

//   const defaultStaff = {
//     staffno: "",
//     fname: "",
//     lname: "",
//     position: "",
//     sex: "",
//     dob: "",
//     branchno: "",
//     salary: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//   };

//   const currentStaff = { ...defaultStaff, ...staff };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${currentStaff.staffno}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <form className={classes.form} onSubmit={handleSubmit}>
//       <div>
//         <h1>
//           {currentStaff.fname} {currentStaff.lname}
//         </h1>
//       </div>
//       <div>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           type="text"
//           id="staffno"
//           name="staffno"
//           defaultValue={currentStaff.staffno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="fname">First Name</label>
//         <input
//           type="text"
//           id="fname"
//           name="fname"
//           defaultValue={currentStaff.fname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           type="text"
//           id="lname"
//           name="lname"
//           defaultValue={currentStaff.lname}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           id="position"
//           name="position"
//           defaultValue={currentStaff.position}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="sex">Sex</label>
//         <input
//           type="text"
//           id="sex"
//           name="sex"
//           defaultValue={currentStaff.sex}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           type="date"
//           id="dob"
//           name="dob"
//           defaultValue={currentStaff.dob ? currentStaff.dob.split("T")[0] : ""}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           defaultValue={currentStaff.branchno}
//           readOnly={isEditMode}
//         />
//       </div>
//       <div>
//         <label htmlFor="salary">Salary</label>
//         <input
//           type="text"
//           id="salary"
//           name="salary"
//           defaultValue={currentStaff.salary}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="telephone">Telephone</label>
//         <input
//           type="text"
//           id="telephone"
//           name="telephone"
//           defaultValue={currentStaff.telephone}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           name="mobile"
//           defaultValue={currentStaff.mobile}
//           readOnly={false}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           defaultValue={currentStaff.email}
//           readOnly={false}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button type="submit">Save</button>
//         <button type="button" onClick={() => navigate("/staffs")}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }
///////////////////////////////////////////////
// import React from "react";
// import { Form, json, redirect, useNavigate } from "react-router-dom";
// import classes from "./StaffForm.module.css";

// function StaffForm({ staff, method }) {
//   const navigate = useNavigate();
//   const isEditing = method === "PATCH";

//   // Debugging: Log the staff prop to ensure it's received correctly
//   console.log("Staff data:", staff);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/staffs";
//     if (method === "PATCH") {
//       url += `/${staff.staffno}`; // Use staff.staffno directly for PATCH requests
//     }

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formData,
//       });

//       if (response.status === 422) {
//         const data = await response.json();
//         console.error(data.errors); // Handle validation errors
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Could not save staff");
//       }

//       navigate("/staffs");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <Form method={method} className={classes.form} onSubmit={handleSubmit}>
//       <p>
//         <label htmlFor="staffno">Staff Number</label>
//         <input
//           id="staffno"
//           type="text"
//           name="staffno"
//           required
//           defaultValue={staff?.staffno || ""}
//           readOnly={isEditing} // Make the input field read-only only for PATCH requests
//         />
//       </p>
//       <p>
//         <label htmlFor="fname">First Name</label>
//         <input
//           id="fname"
//           type="text"
//           name="fname"
//           required
//           defaultValue={staff?.fname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           id="lname"
//           type="text"
//           name="lname"
//           required
//           defaultValue={staff?.lname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="position">Position</label>
//         <input
//           id="position"
//           type="text"
//           name="position"
//           required
//           defaultValue={staff?.position || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="sex">Sex</label>
//         <input
//           id="sex"
//           type="text"
//           name="sex"
//           required
//           defaultValue={staff?.sex || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="dob">Date of Birth</label>
//         <input
//           id="dob"
//           type="date"
//           name="dob"
//           required
//           defaultValue={
//             staff?.dob ? new Date(staff.dob).toISOString().split("T")[0] : ""
//           }
//         />
//       </p>
//       <p>
//         <label htmlFor="salary">Salary</label>
//         <input
//           id="salary"
//           type="number"
//           name="salary"
//           step="0.01"
//           required
//           defaultValue={staff?.salary || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           id="branchno"
//           type="text"
//           name="branchno"
//           required
//           defaultValue={staff?.branchno || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="telephone">Telephone Number</label>
//         <input
//           id="telephone"
//           type="text"
//           name="telephone"
//           required
//           defaultValue={staff?.telephone || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="mobile">Mobile Number</label>
//         <input
//           id="mobile"
//           type="text"
//           name="mobile"
//           required
//           defaultValue={staff?.mobile || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           required
//           defaultValue={staff?.email || ""}
//         />
//       </p>
//       {/* <p>
//         <label htmlFor="image">Image URL</label>
//         <input
//           id="image"
//           type="text"
//           name="image"
//           defaultValue={staff?.image || ""}
//         />
//       </p> */}
//       <div className={classes.actions}>
//         <button type="button" onClick={() => navigate("..")}>
//           Cancel
//         </button>
//         <button type="submit">
//           {method === "PATCH" ? "Update Staff" : "Create Staff"}
//         </button>
//       </div>
//     </Form>
//   );
// }

// export default StaffForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/staffs";
//   if (method === "PATCH") {
//     url += `/${params.staffno}`;
//   }

//   try {
//     const response = await fetch(url, {
//       method: method,
//       body: formData,
//     });

//     if (response.status === 422) {
//       return response; // Return response to handle validation errors
//     }

//     if (!response.ok) {
//       throw new Error("Could not save staff");
//     }

//     return redirect("/staffs");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save staff" }, { status: 500 });
//   }
// }

import React from "react";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import classes from "./StaffForm.module.css";

function StaffForm({ staff, method }) {
  const navigate = useNavigate();
  const isEditing = method === "PATCH";

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let url = "http://localhost:8000/api/staffs";
    if (isEditing) {
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
          readOnly={isEditing}
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
          readOnly={isEditing}
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
          readOnly={isEditing}
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
          readOnly={isEditing}
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
          readOnly={isEditing}
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
          readOnly={isEditing}
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
          readOnly={!isEditing} // Editable only in edit mode
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
          readOnly={isEditing}
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
          readOnly={!isEditing} // Editable only in edit mode
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
          readOnly={!isEditing} // Editable only in edit mode
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
          readOnly={!isEditing} // Editable only in edit mode
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button type="submit">
          {isEditing ? "Update Staff" : "Create Staff"}
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

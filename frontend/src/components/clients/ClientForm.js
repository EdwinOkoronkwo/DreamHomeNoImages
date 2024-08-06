// import React from "react";
// import { Form, json, redirect, useNavigate } from "react-router-dom";
// import classes from "./ClientForm.module.css";
// import config from "../../config/config";

// function ClientForm({ method, client }) {
//   const navigate = useNavigate();

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     // Prepare data for submission
//     const clientData = {
//       clientno: formData.get("clientno"),
//       fname: formData.get("fname"),
//       lname: formData.get("lname"),
//       telno: formData.get("telno"),
//       street: formData.get("street"),
//       city: formData.get("city"),
//       email: formData.get("email"),
//       preftype: formData.get("preftype"),
//       maxrent: formData.get("maxrent"),
//     };

//     let url = "http://localhost:8000/api/clients";
//     if (method === "PATCH") {
//       url += `/${clientData.clientno}`;
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
//         throw new Error("Could not save client");
//       }

//       navigate("/clients");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <Form method={method} className={classes.form} onSubmit={handleSubmit}>
//       <p>
//         <label htmlFor="clientno">Client Number</label>
//         <input
//           id="clientno"
//           type="text"
//           name="clientno"
//           required
//           defaultValue={client && client.clientno}
//         />
//       </p>
//       <p>
//         <label htmlFor="fname">First Name</label>
//         <input
//           id="fname"
//           type="text"
//           name="fname"
//           required
//           defaultValue={client && client.fname}
//         />
//       </p>
//       <p>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           id="lname"
//           type="text"
//           name="lname"
//           required
//           defaultValue={client && client.lname}
//         />
//       </p>
//       <p>
//         <label htmlFor="telno">Telephone Number</label>
//         <input
//           id="telno"
//           type="text"
//           name="telno"
//           required
//           defaultValue={client && client.telno}
//         />
//       </p>
//       <p>
//         <label htmlFor="street">Street</label>
//         <input
//           id="street"
//           type="text"
//           name="street"
//           required
//           defaultValue={client && client.street}
//         />
//       </p>
//       <p>
//         <label htmlFor="city">City</label>
//         <input
//           id="city"
//           type="text"
//           name="city"
//           required
//           defaultValue={client && client.city}
//         />
//       </p>
//       <p>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           required
//           defaultValue={client && client.email}
//         />
//       </p>
//       <p>
//         <label htmlFor="preftype">Preferred Type</label>
//         <input
//           id="preftype"
//           type="text"
//           name="preftype"
//           required
//           defaultValue={client && client.preftype}
//         />
//       </p>
//       <p>
//         <label htmlFor="maxrent">Max Rent</label>
//         <input
//           id="maxrent"
//           type="number"
//           name="maxrent"
//           step="0.01"
//           required
//           defaultValue={client && client.maxrent}
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

// export default ClientForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/clients";
//   if (method === "PATCH") {
//     url += `/${params.clientno}`;
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
//       throw new Error("Could not save client");
//     }

//     return redirect("/clients");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save client" }, { status: 500 });
//   }
// }
// import React from "react";
// import { Form, json, redirect, useNavigate } from "react-router-dom";
// import classes from "./ClientForm.module.css";

// function ClientForm({ method, client }) {
//   const navigate = useNavigate();

//   // Debugging: Log the client prop to ensure it's received correctly
//   console.log("Client data:", client);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/clients";
//     if (method === "PATCH") {
//       url += `/${formData.get("clientno")}`;
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
//         throw new Error("Could not save client");
//       }

//       navigate("/clients");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <Form method={method} className={classes.form} onSubmit={handleSubmit}>
//       <p>
//         <label htmlFor="clientno">Client Number</label>
//         <input
//           id="clientno"
//           type="text"
//           name="clientno"
//           required
//           defaultValue={client?.clientno || ""} // Default to empty string if client is undefined
//         />
//       </p>
//       <p>
//         <label htmlFor="fname">First Name</label>
//         <input
//           id="fname"
//           type="text"
//           name="fname"
//           required
//           defaultValue={client?.fname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           id="lname"
//           type="text"
//           name="lname"
//           required
//           defaultValue={client?.lname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="telno">Telephone Number</label>
//         <input
//           id="telno"
//           type="text"
//           name="telno"
//           required
//           defaultValue={client?.telno || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="street">Street</label>
//         <input
//           id="street"
//           type="text"
//           name="street"
//           required
//           defaultValue={client?.street || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="city">City</label>
//         <input
//           id="city"
//           type="text"
//           name="city"
//           required
//           defaultValue={client?.city || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           required
//           defaultValue={client?.email || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="preftype">Preferred Type</label>
//         <input
//           id="preftype"
//           type="text"
//           name="preftype"
//           required
//           defaultValue={client?.preftype || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="maxrent">Max Rent</label>
//         <input
//           id="maxrent"
//           type="number"
//           name="maxrent"
//           step="0.01"
//           required
//           defaultValue={client?.maxrent || ""}
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

// export default ClientForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/clients";
//   if (method === "PATCH") {
//     url += `/${params.clientno}`;
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
//       throw new Error("Could not save client");
//     }

//     return redirect("/clients");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save client" }, { status: 500 });
//   }
// }

// import React from "react";
// import { Form, json, redirect, useNavigate } from "react-router-dom";
// import classes from "./ClientForm.module.css";

// function ClientForm({ method, client }) {
//   const navigate = useNavigate();

//   // Debugging: Log the client prop to ensure it's received correctly
//   console.log("Client data:", client);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     let url = "http://localhost:8000/api/clients";
//     if (method === "PATCH") {
//       url += `/${client.clientno}`; // Use client.clientno directly for PATCH requests
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
//         throw new Error("Could not save client");
//       }

//       navigate("/clients");
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   return (
//     <Form method={method} className={classes.form} onSubmit={handleSubmit}>
//       <p>
//         <label htmlFor="clientno">Client Number</label>
//         <input
//           id="clientno"
//           type="text"
//           name="clientno"
//           required
//           defaultValue={client?.clientno || ""}
//           readOnly={method === "PATCH"} // Make the input field read-only only for PATCH requests
//         />
//       </p>
//       <p>
//         <label htmlFor="fname">First Name</label>
//         <input
//           id="fname"
//           type="text"
//           name="fname"
//           required
//           defaultValue={client?.fname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="lname">Last Name</label>
//         <input
//           id="lname"
//           type="text"
//           name="lname"
//           required
//           defaultValue={client?.lname || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="telno">Telephone Number</label>
//         <input
//           id="telno"
//           type="text"
//           name="telno"
//           required
//           defaultValue={client?.telno || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="street">Street</label>
//         <input
//           id="street"
//           type="text"
//           name="street"
//           required
//           defaultValue={client?.street || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="city">City</label>
//         <input
//           id="city"
//           type="text"
//           name="city"
//           required
//           defaultValue={client?.city || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           required
//           defaultValue={client?.email || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="preftype">Preferred Type</label>
//         <input
//           id="preftype"
//           type="text"
//           name="preftype"
//           required
//           defaultValue={client?.preftype || ""}
//         />
//       </p>
//       <p>
//         <label htmlFor="maxrent">Max Rent</label>
//         <input
//           id="maxrent"
//           type="number"
//           name="maxrent"
//           step="0.01"
//           required
//           defaultValue={client?.maxrent || ""}
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

// export default ClientForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const formData = await request.formData();

//   let url = "http://localhost:8000/api/clients";
//   if (method === "PATCH") {
//     url += `/${params.clientno}`;
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
//       throw new Error("Could not save client");
//     }

//     return redirect("/clients");
//   } catch (error) {
//     console.error(error.message);
//     throw json({ message: "Could not save client" }, { status: 500 });
//   }
// }

import React from "react";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import classes from "./ClientForm.module.css";

function ClientForm({ method, client }) {
  const navigate = useNavigate();

  // Debugging: Log the client prop to ensure it's received correctly
  console.log("Client data:", client);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let url = "http://localhost:8000/api/clients";
    if (method === "PATCH") {
      url += `/${client.clientno}`; // Use client.clientno directly for PATCH requests
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
        throw new Error("Could not save client");
      }

      navigate("/clients");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form method={method} className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="clientno">Client Number</label>
        <input
          id="clientno"
          type="text"
          name="clientno"
          required
          defaultValue={client?.clientno || ""}
          readOnly={method === "PATCH"} // Make the input field read-only only for PATCH requests
        />
      </p>
      <p>
        <label htmlFor="fname">First Name</label>
        <input
          id="fname"
          type="text"
          name="fname"
          required
          defaultValue={client?.fname || ""}
        />
      </p>
      <p>
        <label htmlFor="lname">Last Name</label>
        <input
          id="lname"
          type="text"
          name="lname"
          required
          defaultValue={client?.lname || ""}
        />
      </p>
      <p>
        <label htmlFor="telno">Telephone Number</label>
        <input
          id="telno"
          type="text"
          name="telno"
          required
          defaultValue={client?.telno || ""}
        />
      </p>
      <p>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          name="street"
          required
          defaultValue={client?.street || ""}
        />
      </p>
      <p>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          name="city"
          required
          defaultValue={client?.city || ""}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={client?.email || ""}
        />
      </p>
      <p>
        <label htmlFor="preftype">Preferred Type</label>
        <input
          id="preftype"
          type="text"
          name="preftype"
          required
          defaultValue={client?.preftype || ""}
        />
      </p>
      <p>
        <label htmlFor="maxrent">Max Rent</label>
        <input
          id="maxrent"
          type="number"
          name="maxrent"
          step="0.01"
          required
          defaultValue={client?.maxrent || ""}
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

export default ClientForm;

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  let url = "http://localhost:8000/api/clients";
  if (method === "PATCH") {
    url += `/${params.clientno}`;
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
      throw new Error("Could not save client");
    }

    return redirect("/clients");
  } catch (error) {
    console.error(error.message);
    throw json({ message: "Could not save client" }, { status: 500 });
  }
}

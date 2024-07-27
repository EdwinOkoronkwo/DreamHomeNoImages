// import React, { Suspense } from "react";
// import {
//   defer,
//   json,
//   useLoaderData,
//   Await,
//   useRouteLoaderData,
// } from "react-router-dom";
// import ClientsList from "../../components/clients/ClientsList"; // Updated import path

// function ClientsPage() {
//    const { clients } = useLoaderData(); // Updated variable name
//   //const { clients } = useRouteLoaderData("client-detail");

//   return (
//     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
//       <Await resolve={clients}>
//         {(loadedClients) => <ClientsList clients={loadedClients} />}{" "}
//         {/* Updated component name */}
//       </Await>
//     </Suspense>
//   );
// }

// export default ClientsPage;

// async function loadClients() {
//   // Updated function name
//   const response = await fetch("http://localhost:8000/api/clients"); // Updated API endpoint

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch clients" }, // Updated message
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.clients; // Updated property name
//   }
// }

// export function loader() {
//   return defer({
//     clients: loadClients(), // Updated function call
//   });
// }

// ClientsPage.js
// ClientsPage.js
import React, { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import ClientsList from "../../components/clients/ClientsList";

function ClientsPage() {
  const { clients } = useLoaderData(); // useLoaderData should match the loader

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={clients}>
        {(loadedClients) => <ClientsList clients={loadedClients} />}
      </Await>
    </Suspense>
  );
}

export default ClientsPage;

async function loadClients() {
  try {
    const response = await fetch("http://localhost:8000/api/clients");

    if (!response.ok) {
      throw json({ message: "Could not fetch clients" }, { status: 500 });
    }

    const resData = await response.json();
    return resData.clients; // Ensure this matches the expected data structure
  } catch (error) {
    console.error(error);
    throw json(
      { message: "An error occurred while fetching clients" },
      { status: 500 }
    );
  }
}

export function loader() {
  return defer({
    clients: loadClients(),
  });
}

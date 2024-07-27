// import React, { Suspense } from "react";
// import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
// import ClientItem from "../../components/clients/ClientItem";
// import ClientsList from "../../components/clients/ClientsList";

// function ClientDetailPage() {
//   const { client, clients } = useRouteLoaderData("client-detail");

//   return (
//     <>
//       <Suspense
//         fallback={
//           <p style={{ textAlign: "center" }}>Loading client details ...</p>
//         }
//       >
//         <ClientItem client={client} />
//       </Suspense>
//       <Suspense
//         fallback={
//           <p style={{ textAlign: "center" }}>Loading clients list ...</p>
//         }
//       >
//         <ClientsList clients={clients} />
//       </Suspense>
//     </>
//   );
// }

// export default ClientDetailPage;

// async function loadClient(clientno) {
//   const response = await fetch(`http://localhost:8000/api/clients/${clientno}`);
//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected client." },
//       { status: 500 }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.client;
//   }
// }

// async function loadClients() {
//   const response = await fetch("http://localhost:8000/api/clients");
//   if (!response.ok) {
//     throw json({ message: "Could not fetch clients." }, { status: 500 });
//   } else {
//     const resData = await response.json();
//     return resData.clients;
//   }
// }

// export async function loader({ params }) {
//   const clientno = params.clientno;

//   return defer({
//     client: loadClient(clientno), // Defer to handle the promise
//     clients: loadClients(), // Defer to handle the promise
//   });
// }

// export async function action({ params, request }) {
//   const clientno = params.clientno;
//   const response = await fetch(
//     `http://localhost:8000/api/clients/${clientno}`,
//     {
//       method: request.method,
//     }
//   );

//   if (!response.ok) {
//     throw json({ message: "Could not delete client." }, { status: 500 });
//   }

//   return redirect("/clients");
// }
// import React, { useState, useEffect } from "react";
// import { useLoaderData, json, redirect } from "react-router-dom";
// import ClientItem from "../../components/clients/ClientItem";
// import ClientsList from "../../components/clients/ClientsList";

// // ClientDetailPage component
// function ClientDetailPage() {
//   const { client, clients } = useLoaderData();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("ClientDetailPage useEffect triggered");
//     console.log("Client data:", client);
//     console.log("Clients list:", clients);

//     if (client && clients) {
//       setLoading(false);
//     }
//   }, [client, clients]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading...</p>;
//   }

//   return (
//     <>
//       <ClientItem client={client} />
//       <ClientsList clients={clients} />
//     </>
//   );
// }

// export default ClientDetailPage;

// // Function to load client details by clientno
// async function loadClient(clientno) {
//   console.log(`Fetching client with clientno: ${clientno}`);

//   try {
//     const response = await fetch(
//       `http://localhost:8000/api/clients/${clientno}`
//     );
//     if (!response.ok) {
//       console.error("Error fetching client details:", response.statusText);
//       throw json(
//         { message: "Could not fetch details for selected client." },
//         { status: 500 }
//       );
//     } else {
//       const resData = await response.json();
//       console.log("Client details response data:", resData);
//       return resData.client;
//     }
//   } catch (error) {
//     console.error("Error in loadClient function:", error);
//     throw json({ message: "Error loading client details." }, { status: 500 });
//   }
// }

// // Function to load all clients
// async function loadClients() {
//   console.log("Fetching all clients");

//   try {
//     const response = await fetch("http://localhost:8000/api/clients");
//     if (!response.ok) {
//       console.error("Error fetching clients:", response.statusText);
//       throw json({ message: "Could not fetch clients." }, { status: 500 });
//     } else {
//       const resData = await response.json();
//       console.log("Clients response data:", resData);
//       return resData.clients;
//     }
//   } catch (error) {
//     console.error("Error in loadClients function:", error);
//     throw json({ message: "Error loading clients list." }, { status: 500 });
//   }
// }

// // Loader function to fetch client details and list of clients
// export async function loader({ params }) {
//   const clientno = params.clientno;
//   console.log(`Loader function called with clientno: ${clientno}`);

//   try {
//     const [client, clients] = await Promise.all([
//       loadClient(clientno),
//       loadClients(),
//     ]);
//     console.log("Loaded client and clients:", { client, clients });
//     return { client, clients };
//   } catch (error) {
//     console.error("Error in loader function:", error);
//     throw json({ message: "Error loading data." }, { status: 500 });
//   }
// }

// // Action function to handle client deletion
// export async function action({ params, request }) {
//   const clientno = params.clientno;
//   console.log(`Deleting client with clientno: ${clientno}`);

//   try {
//     const response = await fetch(
//       `http://localhost:8000/api/clients/${clientno}`,
//       {
//         method: request.method,
//       }
//     );

//     if (!response.ok) {
//       console.error("Error deleting client:", response.statusText);
//       throw json({ message: "Could not delete client." }, { status: 500 });
//     }

//     return redirect("/clients");
//   } catch (error) {
//     console.error("Error in action function:", error);
//     throw json({ message: "Error deleting client." }, { status: 500 });
//   }
// }

// ClientDetailPage.js
// import React, { Suspense } from "react";
// import {
//   defer,
//   json,
//   Await,
//   useRouteLoaderData,
//   redirect,
// } from "react-router-dom";
// import ClientItem from "../../components/clients/ClientItem";
// import ClientsList from "../../components/clients/ClientsList";

// function ClientDetailPage() {
//   const { client, clients } = useRouteLoaderData("client-detail");

//   return (
//     <>
//       <Suspense
//         fallback={<p style={{ textAlign: "center" }}>Loading client...</p>}
//       >
//         <Await resolve={client}>
//           {(loadedClient) => <ClientItem client={loadedClient} />}
//         </Await>
//       </Suspense>
//       <Suspense
//         fallback={<p style={{ textAlign: "center" }}>Loading clients...</p>}
//       >
//         <Await resolve={clients}>
//           {(loadedClients) => <ClientsList clients={loadedClients} />}
//         </Await>
//       </Suspense>
//     </>
//   );
// }

// export default ClientDetailPage;

// async function loadClient(clientno) {
//   const response = await fetch(`http://localhost:8000/api/clients/${clientno}`);

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for the selected client." },
//       { status: 500 }
//     );
//   }

//   const resData = await response.json();
//   return resData.client;
// }

// async function loadClients() {
//   const response = await fetch("http://localhost:8000/api/clients");

//   if (!response.ok) {
//     throw json({ message: "Could not fetch clients." }, { status: 500 });
//   }

//   const resData = await response.json();
//   return resData.clients;
// }

// export async function loader({ params }) {
//   const clientno = params.clientno;
//   const clientPromise = loadClient(clientno);
//   const clientsPromise = loadClients();

//   return defer({
//     client: clientPromise,
//     clients: clientsPromise,
//   });
// }

// export async function action({ params, request }) {
//   const clientno = params.clientno;

//   const response = await fetch(
//     `http://localhost:8000/api/clients/${clientno}`,
//     {
//       method: request.method,
//     }
//   );

//   if (!response.ok) {
//     throw json({ message: "Could not delete client." }, { status: 500 });
//   }

//   return redirect("/clients");
// }

import React, { Suspense } from "react";
import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import ClientItem from "../../components/clients/ClientItem";
import ClientsList from "../../components/clients/ClientsList";

function ClientDetailPage() {
  const { client, clients } = useRouteLoaderData("client-detail");

  console.log("Client data:", client);
  console.log("Clients list:", clients);

  return (
    <>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading client details...</p>
        }
      >
        <ClientItem client={client} />
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading client list...</p>}
      >
        <ClientsList clients={clients} />
      </Suspense>
    </>
  );
}

export default ClientDetailPage;

async function loadClient(clientno) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/clients/${clientno}`
    );
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for the selected client." },
        { status: 500 }
      );
    }
    const resData = await response.json();
    console.log("Fetched client data:", resData.client);
    return resData.client;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
}

async function loadClients() {
  try {
    const response = await fetch("http://localhost:8000/api/clients");
    if (!response.ok) {
      throw json({ message: "Could not fetch clients." }, { status: 500 });
    }
    const resData = await response.json();
    console.log("Fetched clients list:", resData.clients);
    return resData.clients;
  } catch (error) {
    console.error("Error fetching clients list:", error);
    throw error;
  }
}

export async function loader({ params }) {
  const clientno = params.clientno;
  return defer({
    client: await loadClient(clientno),
    clients: loadClients(),
  });
}

export async function action({ params, request }) {
  const clientno = params.clientno;
  const response = await fetch(
    `http://localhost:8000/api/clients/${clientno}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete client." }, { status: 500 });
  }

  return redirect("/clients");
}

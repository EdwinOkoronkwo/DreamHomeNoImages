// import React, { useState, useEffect } from "react";
// import { useLoaderData, json, redirect } from "react-router-dom";
// import StaffItem from "../../components/staffs/StaffItem";
// import StaffList from "../../components/staffs/StaffsList";

// // StaffDetailPage component
// function StaffDetailPage() {
//   const { staff, staffs } = useLoaderData();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (staff && staffs) {
//       setLoading(false);
//     }
//   }, [staff, staffs]);

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ textAlign: "center" }}>{error.message}</p>;
//   }

//   return (
//     <>
//       <StaffItem staff={staff} />
//       <StaffList staffs={staffs} />
//     </>
//   );
// }

// export default StaffDetailPage;

// // Function to load staff details by staffno
// async function loadStaff(staffno) {
//   try {
//     const response = await fetch(`http://localhost:8000/api/staffs/${staffno}`);
//     if (!response.ok) {
//       throw json(
//         { message: "Could not fetch details for selected staff." },
//         { status: 500 }
//       );
//     } else {
//       const resData = await response.json();
//       return resData.staff;
//     }
//   } catch (error) {
//     throw json({ message: "Error loading staff details." }, { status: 500 });
//   }
// }

// // Function to load all staff members
// async function loadStaffs() {
//   try {
//     const response = await fetch("http://localhost:8000/api/staffs");
//     if (!response.ok) {
//       throw json(
//         { message: "Could not fetch staff members." },
//         { status: 500 }
//       );
//     } else {
//       const resData = await response.json();
//       return resData.staffs;
//     }
//   } catch (error) {
//     throw json({ message: "Error loading staff list." }, { status: 500 });
//   }
// }

// // Loader function to fetch staff details and list of staff members
// export async function loader({ params }) {
//   const staffno = params.staffno;

//   try {
//     const [staff, staffs] = await Promise.all([
//       loadStaff(staffno),
//       loadStaffs(),
//     ]);

//     return { staff, staffs };
//   } catch (error) {
//     throw json({ message: "Error loading data." }, { status: 500 });
//   }
// }

// // Action function to handle staff deletion
// export async function action({ params, request }) {
//   const staffno = params.staffno;
//   const response = await fetch(`http://localhost:8000/api/staffs/${staffno}`, {
//     method: request.method,
//   });

//   if (!response.ok) {
//     throw json({ message: "Could not delete staff." }, { status: 500 });
//   }

//   return redirect("/staffs");
// }

import React, { Suspense } from "react";
import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import StaffItem from "../../components/staffs/StaffItem";
import StaffsList from "../../components/staffs/StaffsList";
import StaffForm from "../../components/staffs/StaffForm"; // Import StaffForm

function StaffDetailPage() {
  const { staff, staffs } = useRouteLoaderData("staff-detail");

  return (
    <>
      <Suspense fallback={<p>Loading staff details...</p>}>
        <StaffItem staff={staff} />
      </Suspense>
      <Suspense fallback={<p>Loading staff list...</p>}>
        <StaffsList staffs={staffs} />
      </Suspense>
    </>
  );
}

export default StaffDetailPage;

export async function loader({ params }) {
  const staffno = params.staffno;

  try {
    const staffResponse = await fetch(
      `http://localhost:8000/api/staffs/${staffno}`
    );
    if (!staffResponse.ok) {
      throw json(
        { message: "Could not fetch staff details." },
        { status: 500 }
      );
    }
    const staffData = await staffResponse.json();

    const staffsResponse = await fetch("http://localhost:8000/api/staffs");
    if (!staffsResponse.ok) {
      throw json({ message: "Could not fetch staff list." }, { status: 500 });
    }
    const staffsData = await staffsResponse.json();

    return defer({
      staff: staffData.staff,
      staffs: staffsData.staffs,
    });
  } catch (error) {
    console.error(error);
    throw json({ message: "Could not fetch staff data." }, { status: 500 });
  }
}

export async function action({ params, request }) {
  const staffno = params.staffno;
  const response = await fetch(`http://localhost:8000/api/staffs/${staffno}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete staff." }, { status: 500 });
  }

  return redirect("/staffs");
}

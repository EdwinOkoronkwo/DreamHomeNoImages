import React, { Suspense } from "react";
import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import StaffItem from "../../components/staffs/StaffItem";
import StaffList from "../../components/staffs/StaffsList";

function StaffDetailPage() {
  const { staff, staffs } = useRouteLoaderData("staff-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <StaffItem staff={staff} />
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <StaffList staffs={staffs} />
      </Suspense>
    </>
  );
}

export default StaffDetailPage;

async function loadStaff(staffno) {
  const response = await fetch(`http://localhost:8000/api/staffs/${staffno}`);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected staff." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.staff;
  }
}

async function loadStaffs() {
  const response = await fetch("http://localhost:8000/api/staffs");
  if (!response.ok) {
    throw json({ message: "Could not fetch staffs." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.staffs;
  }
}

export async function loader({ params }) {
  const staffno = params.staffno;

  return defer({
    staff: await loadStaff(staffno),
    staffs: loadStaffs(),
  });
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

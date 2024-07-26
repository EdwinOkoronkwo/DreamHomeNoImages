import React, { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import StaffList from "../../components/staffs/StaffsList";

function StaffsPage() {
  const { staffs } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={staffs}>
        {(loadedStaffs) => <StaffList staffs={loadedStaffs} />}
      </Await>
    </Suspense>
  );
}

export default StaffsPage;

async function loadStaffs() {
  const response = await fetch("http://localhost:8000/api/staffs");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch staffs" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.staffs;
  }
}

export function loader() {
  return defer({
    staffs: loadStaffs(),
  });
}

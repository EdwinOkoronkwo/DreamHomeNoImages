import React from "react";
import StaffForm from "../../components/staffs/StaffForm"; // Adjust the import path as needed
import { json, redirect } from "react-router-dom";

function NewStaffPage() {
  return <StaffForm method="POST" />;
}

export default NewStaffPage;

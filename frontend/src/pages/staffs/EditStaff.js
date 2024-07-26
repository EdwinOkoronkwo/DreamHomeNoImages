import React from "react";
import StaffForm from "../../components/staffs/StaffForm";
import { useRouteLoaderData } from "react-router-dom";

const EditStaffPage = () => {
  const data = useRouteLoaderData("staff-detail");
  const staff = data.staff;

  return <StaffForm staff={staff} method="PATCH" />;
};

export default EditStaffPage;

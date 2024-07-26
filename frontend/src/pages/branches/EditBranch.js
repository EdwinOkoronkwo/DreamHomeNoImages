import React from "react";
import BranchForm from "../../components/branches/BranchForm";
import { useRouteLoaderData } from "react-router-dom";

const EditBranchPage = () => {
  const data = useRouteLoaderData("branch-detail");
  const branch = data.branch;

  return <BranchForm branch={branch} method="PATCH" />;
};

export default EditBranchPage;

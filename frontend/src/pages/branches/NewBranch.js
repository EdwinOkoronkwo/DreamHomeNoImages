import React from "react";
import BranchForm from "../../components/branches/BranchForm"; // Replace with your actual form component
import { json, redirect } from "react-router-dom";

function NewBranchPage() {
  return <BranchForm method="POST" />;
}

export default NewBranchPage;

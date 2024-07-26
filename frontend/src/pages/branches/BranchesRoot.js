import React from "react";
import { Outlet } from "react-router-dom";
import BranchesNavigation from "../../components/branches/BranchesNavigation";

function BranchesRootLayout() {
  return (
    <>
      <BranchesNavigation />
      <Outlet />
    </>
  );
}

export default BranchesRootLayout;

// StaffRoot.js
import React from "react";
import { Outlet } from "react-router-dom";
import StaffsNavigation from "../../components/staffs/StaffsNavigation";

function StaffRoot() {
  return (
    <>
      <StaffsNavigation />
      <Outlet />
    </>
  );
}

export default StaffRoot;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import BranchesNavigation from "../../components/branches/BranchesNavigation";

// function BranchesRootLayout() {
//   return (
//     <>
//       <BranchesNavigation />
//       <Outlet />
//     </>
//   );
// }

// export default BranchesRootLayout;

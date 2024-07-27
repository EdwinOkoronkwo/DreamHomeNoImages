import React, { Suspense } from "react";
import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import BranchItem from "../../components/branches/BranchItem";
import BranchesList from "../../components/branches/BranchesList";

function BranchDetailPage() {
  const { branch, branches } = useRouteLoaderData("branch-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <BranchItem branch={branch} />
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <BranchesList branches={branches} />
      </Suspense>
    </>
  );
}

export default BranchDetailPage;

async function loadBranch(branchno) {
  const response = await fetch(
    `http://localhost:8000/api/branches/${branchno}`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected branch." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.branch;
  }
}

async function loadBranches() {
  const response = await fetch("http://localhost:8000/api/branches");
  if (!response.ok) {
    throw json({ message: "Could not fetch branches." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.branches;
  }
}

export async function loader({ params }) {
  const branchno = params.branchno;

  return defer({
    branch: await loadBranch(branchno),
    branches: loadBranches(),
  });
}

export async function action({ params, request }) {
  const branchno = params.branchno;
  const response = await fetch(
    `http://localhost:8000/api/branches/${branchno}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete branch." }, { status: 500 });
  }

  return redirect("/branches");
}

// import React, { Suspense } from "react";
// import { defer, json, redirect, useRouteLoaderData } from "react-router-dom";
// import BranchItem from "../../components/branches/BranchItem";
// import BranchesList from "../../components/branches/BranchesList";

// function BranchDetailPage() {
//   const { branch, branches } = useRouteLoaderData("branch-detail");

//   return (
//     <>
//       <Suspense
//         fallback={
//           <p style={{ textAlign: "center" }}>Loading branch details...</p>
//         }
//       >
//         <BranchItem branch={branch} />
//       </Suspense>
//       <Suspense
//         fallback={<p style={{ textAlign: "center" }}>Loading branch list...</p>}
//       >
//         <BranchesList branches={branches} />
//       </Suspense>
//     </>
//   );
// }

// export default BranchDetailPage;

// async function loadBranch(branchno) {
//   const response = await fetch(
//     `http://localhost:8000/api/branches/${branchno}`
//   );
//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected branch." },
//       { status: 500 }
//     );
//   }
//   const resData = await response.json();
//   return resData.branch;
// }

// async function loadBranches() {
//   const response = await fetch("http://localhost:8000/api/branches");
//   if (!response.ok) {
//     throw json({ message: "Could not fetch branches." }, { status: 500 });
//   }
//   const resData = await response.json();
//   return resData.branches;
// }

// export async function loader({ params }) {
//   const branchno = params.branchno;

//   // Fetch branch details and branches list concurrently
//   return defer({
//     branch: loadBranch(branchno),
//     branches: loadBranches(),
//   });
// }

// export async function action({ params, request }) {
//   const branchno = params.branchno;
//   const response = await fetch(
//     `http://localhost:8000/api/branches/${branchno}`,
//     {
//       method: request.method,
//     }
//   );

//   if (!response.ok) {
//     throw json({ message: "Could not delete branch." }, { status: 500 });
//   }

//   return redirect("/branches");
// }

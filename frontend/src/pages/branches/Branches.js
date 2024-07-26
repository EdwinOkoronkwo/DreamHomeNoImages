import React, { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import BranchesList from "../../components/branches/BranchesList";

function BranchesPage() {
  const { branches } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={branches}>
        {(loadedBranches) => <BranchesList branches={loadedBranches} />}
      </Await>
    </Suspense>
  );
}

export default BranchesPage;

async function loadBranches() {
  const response = await fetch("http://localhost:8000/api/branches");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch branches" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.branches;
  }
}

export function loader() {
  return defer({
    branches: loadBranches(),
  });
}

// ClientRoot.js
import React from "react";
import { Outlet } from "react-router-dom";
import ClientsNavigation from "../../components/clients/ClientsNavigation";

function ClientsRoot() {
  return (
    <>
      <ClientsNavigation />
      <Outlet />
    </>
  );
}

export default ClientsRoot;

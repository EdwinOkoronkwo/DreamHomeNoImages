import React from "react";
import ClientForm from "../../components/clients/ClientForm"; // Adjust the import path as needed
import { json, redirect } from "react-router-dom";

function NewClientPage() {
  return <ClientForm method="POST" />;
}

export default NewClientPage;

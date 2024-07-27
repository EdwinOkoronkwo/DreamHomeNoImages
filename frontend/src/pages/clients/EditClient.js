import React from "react";
import ClientForm from "../../components/clients/ClientForm";
import { useRouteLoaderData } from "react-router-dom";

const EditClientPage = () => {
  const data = useRouteLoaderData("client-detail");
  const client = data.client;

  return <ClientForm client={client} method="PATCH" />;
};

export default EditClientPage;

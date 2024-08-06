import React from "react";
import { Link } from "react-router-dom";
import classes from "./ClientsList.module.css";

function ClientsList({ clients }) {
  if (!Array.isArray(clients)) {
    if (!Array.isArray(clients) || clients.length === 0) {
      return null; // Render nothing if no branches found
    }
  }

  return (
    <div className={classes.clients}>
      <h1>All Clients</h1>
      <ul className={classes.list}>
        {clients.map((client) => (
          <li key={client.clientno} className={classes.item}>
            <Link to={`/clients/${client.clientno}`}>
              <div className={classes.content}>
                <h2>{`${client.fname} ${client.lname}`}</h2>
                <p>{client.city}</p>
                <p>{client.telno}</p>
                <p>{client.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsList;

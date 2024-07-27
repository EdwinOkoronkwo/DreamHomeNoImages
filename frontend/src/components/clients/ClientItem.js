import { Link, useSubmit } from "react-router-dom";
import config from "../../config/config";
import classes from "./ClientItem.module.css";

function ClientItem({ client }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE", action: `/clients/${client.clientno}` }); // Provide the correct action URL
    }
  }

  console.log("ClientItem received client data:", client);

  return (
    <article className={classes.client}>
      {/* {client.image && (
        <img
          src={`${config.SERVER_URL}${client.image}`}
          alt={`${client.fname} ${client.lname}`}
        />
      )} */}
      <h1>
        {client.fname} {client.lname}
      </h1>
      <p>Telephone: {client.telno}</p>
      <p>City: {client.city}</p>
      <menu className={classes.actions}>
        <Link to={`/clients/${client.clientno}/edit`}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default ClientItem;

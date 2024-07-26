import { Link, useSubmit } from "react-router-dom";
import classes from "./BranchItem.module.css";

function BranchItem({ branch }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <article className={classes.branch}>
      <h1>
        {branch.street}, {branch.city}
      </h1>
      <p>{branch.postcode}</p>
      <p>Branch No: {branch.branchno}</p> {/* Display branch number as text */}
      <menu className={classes.actions}>
        <Link to={`/branches/${branch.branchno}/edit`}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default BranchItem;

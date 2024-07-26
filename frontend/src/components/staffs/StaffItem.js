import { Link, useSubmit } from "react-router-dom";
import config from "../../config/config";
import classes from "./StaffItem.module.css";

function StaffItem({ staff }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  // Log the image URL for debugging
  console.log(`Staff Image URL: ${config.SERVER_URL}${staff.image}`);
  console.log(staff); // Log the whole staff object for further debugging

  return (
    <article className={classes.staff}>
      {staff.image && (
        <img
          src={`${config.SERVER_URL}${staff.image}`}
          alt={`${staff.fname} ${staff.lname}`}
        />
      )}
      <h1>
        {staff.fname} {staff.lname}
      </h1>
      <p>Position: {staff.position}</p>
      <p>Branch No: {staff.branchno}</p>
      <menu className={classes.actions}>
        <Link to={`/staffs/${staff.staffno}/edit`}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default StaffItem;

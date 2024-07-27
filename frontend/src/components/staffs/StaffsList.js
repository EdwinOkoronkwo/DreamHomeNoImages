import { Link } from "react-router-dom";
import config from "../../config/config";
import classes from "./StaffsList.module.css";

function StaffsList({ staffs }) {
  // Ensure staffs is an array before using .map()

  if (!Array.isArray(staffs) || staffs.length === 0) {
    return null; // Render nothing if no branches found
  }

  return (
    <div className={classes.staffs}>
      <h1>All Staff Members</h1>
      <ul className={classes.list}>
        {staffs.map((staff) => (
          <li key={staff.staffno} className={classes.item}>
            <Link to={`/staffs/${staff.staffno}`}>
              <div className={classes.content}>
                <h2>{`${staff.fname} ${staff.lname}`}</h2>
                <p>{staff.position}</p>
                <p>{staff.telephone}</p>
                <p>{staff.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffsList;

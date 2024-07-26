import { NavLink } from "react-router-dom";
import classes from "./StaffsNavigation.module.css";

function StaffsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/staffs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Staffs
            </NavLink>
          </li>
          <li>
            <NavLink to="/staffs/new">New Staff</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default StaffsNavigation;

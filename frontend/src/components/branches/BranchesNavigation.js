import { NavLink } from "react-router-dom";
import classes from "./BranchesNavigation.module.css";

function BranchesNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/branches"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Branches
            </NavLink>
          </li>
          <li>
            <NavLink to="/branches/new">New Branch</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BranchesNavigation;

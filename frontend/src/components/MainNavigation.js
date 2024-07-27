import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import FindBranchItem from "./FindBranchItem";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/branches"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Branches
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staffs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/findBranch"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Find Branch
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <FindBranchItem /> */}
    </header>
  );
}

export default MainNavigation;

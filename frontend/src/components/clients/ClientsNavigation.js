import { NavLink } from "react-router-dom";
import classes from "./ClientsNavigation.module.css";

function ClientsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Clients
            </NavLink>
          </li>
          <li>
            <NavLink to="/clients/new">New Client</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default ClientsNavigation;

import { Link } from "react-router-dom";
import classes from "./BranchesList.module.css";

function BranchesList({ branches }) {
  if (!Array.isArray(branches)) {
    return <p>No branches found.</p>; // or handle loading state
  }

  return (
    <div className={classes.branches}>
      <h1>All Branches</h1>
      <ul className={classes.list}>
        {branches.map((branch) => (
          <li key={`/branches/${branch.branchno}`} className={classes.item}>
            <Link to={`/branches/${branch.branchno}`}>
              <div className={classes.content}>
                <h2>{branch.street}</h2>
                <p>
                  {branch.city}, {branch.postcode}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BranchesList;

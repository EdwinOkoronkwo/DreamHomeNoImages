// // import { Form, useFetcher } from "react-router-dom";
// // import classes from "./NewsletterSignup.module.css";
// // import { useEffect } from "react";

// // function NewsletterSignup() {
// //   const fetcher = useFetcher();
// //   const { data, state } = fetcher;

// //   useEffect(() => {
// //     if (state === "idle" && data && data.message) {
// //       window.alert(data.message);
// //     }
// //   }, [data, state]);
// //   return (
// //     <fetcher.Form
// //       method="post"
// //       action="/newsletter"
// //       className={classes.newsletter}
// //     >
// //       <input
// //         type="email"
// //         placeholder="Sign up for newsletter..."
// //         aria-label="Sign up for newsletter"
// //       />
// //       <button>Sign up</button>
// //     </fetcher.Form>
// //   );
// // }

// // export default NewsletterSignup;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function FindBranchItem() {
//   const [branchno, setBranchno] = useState("");
//   const navigate = useNavigate();

//   async function searchHandler(event) {
//     event.preventDefault();

//     const branchno = "018"; // Ensure this is correctly set
//     try {
//       const url = `http://localhost:8000/api/branches/search?branchno=${branchno}`;
//       console.log("Fetching URL:", url); // Check URL

//       const response = await fetch(url);

//       const contentType = response.headers.get("Content-Type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Invalid response format");
//       }

//       const data = await response.json();
//       if (response.ok) {
//         navigate(`/branches/${data.branch.branchno}/edit`);
//       } else {
//         alert(data.message || "Branch not found");
//       }
//     } catch (error) {
//       console.error("Error fetching branch:", error);
//       alert("An error occurred while searching for the branch.");
//     }
//   }
//   return (
//     <form onSubmit={searchHandler}>
//       <input
//         type="text"
//         placeholder="Enter branch number..."
//         value={branchno}
//         onChange={(e) => setBranchno(e.target.value)}
//         aria-label="Branch number"
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default FindBranchItem;

////////////////////////////////////////////////////////
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./FindBranchItem.module.css";

function FindBranchItem() {
  const branchnoRef = useRef();
  const navigate = useNavigate();

  async function searchHandler(event) {
    event.preventDefault();
    const branchno = branchnoRef.current.value;

    if (!branchno) {
      alert("Please enter a branch number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/branches/${branchno}`
      );

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
      }

      const data = await response.json();
      if (response.ok) {
        navigate(`/branches/${data.branch.branchno}/edit`);
        branchnoRef.current.value = ""; // Clear the input field
      } else {
        alert(data.message || "Branch not found");
      }
    } catch (error) {
      console.error("Error fetching branch:", error);
      alert("An error occurred while searching for the branch.");
    }
  }

  return (
    <div className={classes.findBranchContainer}>
      <form onSubmit={searchHandler} className={classes.findBranch}>
        <input
          type="text"
          placeholder="Enter branch number..."
          aria-label="Branch number"
          ref={branchnoRef}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default FindBranchItem;

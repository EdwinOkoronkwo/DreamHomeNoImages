import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditBranchPage from "./pages/branches/EditBranch";
import ErrorPage from "./pages/Error";
import BranchDetailPage, {
  loader as branchDetailLoader,
  action as deleteBranchAction,
} from "./pages/branches/BranchDetail";
import BranchesPage, {
  loader as branchesLoader,
} from "./pages/branches/Branches";
import BranchesRootLayout from "./pages/branches/BranchesRoot";
import HomePage from "./pages/Home";
import NewBranchPage from "./pages/branches/NewBranch";
import RootLayout from "./pages/Root";
//import { action as manipulateBranchAction } from "./components/branches/BranchForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import EditStaffPage from "./pages/staffs/EditStaff";
import StaffDetailPage, {
  loader as staffDetailLoader,
  action as deleteStaffAction,
} from "./pages/staffs/StaffDetail";
import StaffsPage, { loader as staffsLoader } from "./pages/staffs/Staffs";
import StaffsRootLayout from "./pages/staffs/StaffRoot";
import NewStaffPage from "./pages/staffs/NewStaff";
import { action as manipulateStaffAction } from "./components/staffs/StaffForm";
import FindBranchItem from "./components/FindBranchItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "branches",
        element: <BranchesRootLayout />,
        children: [
          {
            index: true,
            element: <BranchesPage />,
            loader: branchesLoader,
          },
          {
            path: ":branchno",
            id: "branch-detail",
            loader: branchDetailLoader,
            children: [
              {
                index: true,
                element: <BranchDetailPage />,
                action: deleteBranchAction,
              },
              {
                path: "edit",
                element: <EditBranchPage />,
                //   action: manipulateBranchAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewBranchPage />,
            // action: manipulateBranchAction,
          },
        ],
      },
      {
        path: "staffs",
        element: <StaffsRootLayout />,
        children: [
          {
            index: true,
            element: <StaffsPage />,
            loader: staffsLoader,
          },
          {
            path: ":staffno",
            id: "staff-detail",
            loader: staffDetailLoader,
            children: [
              {
                index: true,
                element: <StaffDetailPage />,
                action: deleteStaffAction,
              },
              {
                path: "edit",
                element: <EditStaffPage />,
                action: manipulateStaffAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewStaffPage />,
            //action: manipulateStaffAction,
          },
        ],
      },
      {
        path: "findBranch",
        element: <FindBranchItem />,
        //action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

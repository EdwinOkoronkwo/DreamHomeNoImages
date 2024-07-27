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
// import { action as manipulateBranchAction } from "./components/branches/BranchForm";
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
// Import client-related components
import EditClientPage from "./pages/clients/EditClient";
import ClientDetailPage, {
  loader as clientDetailLoader,
  action as deleteClientAction,
} from "./pages/clients/ClientDetail";
import ClientsPage, { loader as clientsLoader } from "./pages/clients/Clients";
import ClientsRootLayout from "./pages/clients/ClientsRoot";
import NewClientPage from "./pages/clients/NewClient";
import { action as manipulateClientAction } from "./components/clients/ClientForm";

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
              },
            ],
          },
          {
            path: "new",
            element: <NewBranchPage />,
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
          },
        ],
      },
      {
        path: "clients",
        element: <ClientsRootLayout />,
        children: [
          {
            index: true,
            element: <ClientsPage />,
            loader: clientsLoader,
          },
          {
            path: ":clientno",
            id: "client-detail",
            loader: clientDetailLoader,
            children: [
              {
                index: true,
                element: <ClientDetailPage />,
                action: deleteClientAction,
              },
              {
                path: "edit",
                element: <EditClientPage />,
                action: manipulateClientAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewClientPage />,
          },
        ],
      },
      {
        path: "findBranch",
        element: <FindBranchItem />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// {
//   path: "clients",
//   element: <ClientsPage />,
//   loader: clientsLoader,
// },
// {
//   path: "clients/:clientno",
//   element: <ClientDetailPage />,
//   loader: clientDetailLoader,
//   action: clientDetailAction,
// },

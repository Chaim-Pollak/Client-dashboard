import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";

import Navbar from "./components/section/Navbar";
import AddIssueButton from "./components/ui/AddIssueButton";
import IssueModal from "./components/modal/IssueModal";
import EmployeeModal from "./components/modal/employeeModal";
import BackgroundLayout from "./components/ui/BackgroundLayout";
import NavPublic from "./components/section/NavPublic";

const ProtectedRoute = ({ isAuth }) =>
  isAuth ? <Outlet /> : <Navigate to="/" replace />;

function Root({ isAuth }) {
  return (
    <>
      <BackgroundLayout>
        {isAuth ? (
          <>
            <Navbar />
            <AddIssueButton />
          </>
        ) : (
          <NavPublic />
        )}
        <Outlet />

        <IssueModal />
        <EmployeeModal />
      </BackgroundLayout>
    </>
  );
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* Public Routes */}
        <Route element={isAuth ? <Navigate to={"/welcomePage"} /> : <Outlet />}>
          <Route
            index
            lazy={async () => ({
              Component: (
                await import("./components/pages/publicPages/mainPage/HomePage")
              ).default,
            })}
          />
          <Route
            path="login"
            lazy={async () => ({
              Component: (await import("./components/pages/publicPages/Login"))
                .default,
            })}
          />
        </Route>

        <Route
          path="*"
          lazy={async () => ({
            Component: (await import("./components/ui/ErrorPage")).default,
          })}
        />

        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route
            path="welcomePage"
            lazy={async () => ({
              Component: (
                await import("./components/pages/privatePages/WelcomePage")
              ).default,
            })}
          />

          <Route
            path="addIssue"
            lazy={async () => ({
              Component: (await import("./components/pages/forms/IssueForm"))
                .default,
            })}
          />
          <Route
            path="myIssue"
            lazy={async () => ({
              Component: (await import("./components/cards/MyIssues")).default,
            })}
          />
          <Route
            path="allIssues"
            lazy={async () => ({
              Component: (await import("./components/cards/CardIssues"))
                .default,
            })}
          />
          <Route
            path="myIssueHistory"
            lazy={async () => ({
              Component: (await import("./components/cards/MyIssuesHistory"))
                .default,
            })}
          />
        </Route>
        <Route
          path="LeadershipTeam"
          lazy={async () => ({
            Component: (
              await import(
                "./components/pages/publicPages/mainPage/LeadershipTeam"
              )
            ).default,
          })}
        />
        <Route
          path="AboutPage"
          lazy={async () => ({
            Component: (
              await import("./components/pages/publicPages/mainPage/AboutPage")
            ).default,
          })}
        />
        <Route
          path="ContactPage"
          lazy={async () => ({
            Component: (
              await import(
                "./components/pages/publicPages/mainPage/ContactPage"
              )
            ).default,
          })}
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CreateElection } from "./pages/CreateElection";
import { VoteInterface } from "./pages/VoteInterface";
import { ElectionTransparency } from "./pages/ElectionTransparency";
import { ElectionResults } from "./pages/ElectionResults";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireOrganizer>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/create-election",
    element: (
      <ProtectedRoute requireOrganizer>
        <CreateElection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vote/:electionId",
    element: (
      <ProtectedRoute>
        <VoteInterface />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transparency/:electionId",
    Component: ElectionTransparency,
  },
  {
    path: "/results/:electionId",
    Component: ElectionResults,
  },
]);
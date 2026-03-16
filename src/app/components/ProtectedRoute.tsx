import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requireOrganizer?: boolean;
}

export function ProtectedRoute({ children, requireOrganizer = false }: ProtectedRouteProps) {
  const { isAuthenticated, isOrganizer } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireOrganizer && !isOrganizer) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

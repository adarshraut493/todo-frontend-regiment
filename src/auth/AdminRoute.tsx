import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import React from "react";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, authLoading } = useAuth();

  // ⏳ wait until auth check is finished
  if (authLoading) {
    return <div>Checking admin access...</div>;
  }

  // ❌ not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/todos" replace />;
  }

  // ✅ admin allowed
  return <>{children}</>;
};

export default AdminRoute;

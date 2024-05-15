import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/hook";

type Props = {
  requiredRoles: string[];
};

export const ProtectedRoute = ({ requiredRoles }: Props) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasRole(requiredRoles)) {
    // render 401 Page (Unauthorized) page
    return <div>401</div>;
  }

  return <Outlet />;
};

import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

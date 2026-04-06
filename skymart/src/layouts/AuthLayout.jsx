import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
const AuthLayout = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-container">
    
      <Outlet />
    </div>
  );
};

export default AuthLayout;

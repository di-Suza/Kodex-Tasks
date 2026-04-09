import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth.jsx";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full bg-(--primary) items-center justify-center px-4 py-12">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;

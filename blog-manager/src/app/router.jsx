import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/auth/SignUp";
import AuthLayout from "../layouts/AuthLayout";
import CreateBlog from "../pages/dashboard/CreateBlog";
import Dashboard from "../pages/dashboard/Dashboard";
import BlogDetail from "../pages/Blog/BlogDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import EditBlog from "../pages/dashboard/EditBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog/:id", element: <BlogDetail /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute roleRequired="writer">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRoute roleRequired="writer">
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute roleRequired="writer">
            <EditBlog />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
]);

import { createBrowserRouter, Navigate } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";

// dashboard
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import Ecommerce from "../pages/Dashboard/Ecommerce/Ecommerce";
import Crypto from "../pages/Dashboard/Crypto/Crypto";

// pages
import Settings from "../pages/Pages/Settings/Settings";
import Projects from "../pages/Pages/Projects/Projects";
import Clients from "../pages/Pages/Clients/Clients";
import Orders from "../pages/Pages/Orders/Orders";
import Pricing from "../pages/Pages/Pricing/Pricing";
import Chat from "../pages/Pages/Chat/Chat";

// single
import Profile from "../pages/Profile";
import Invoice from "../pages/Invoice";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calender";

// auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Error404 from "../pages/auth/Error404";
import Error500 from "../pages/auth/Error500";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboards/analytics" replace />,
      },
      {
        path: "dashboards",
        children: [
          { path: "analytics", element: <Analytics /> },
          { path: "ecommerce", element: <Ecommerce /> },
          { path: "crypto", element: <Crypto /> },
        ],
      },

      {
        path: "pages",
        children: [
          { path: "settings", element: <Settings /> },
          { path: "projects", element: <Projects /> },
          { path: "clients", element: <Clients /> },
          { path: "orders", element: <Orders /> },
          { path: "pricing", element: <Pricing /> },
          { path: "chat", element: <Chat /> },
        ],
      },

      { path: "/profile", element: <Profile /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/calendar", element: <Calendar /> },
    ],
  },

  {
    path: "/auth",
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "404", element: <Error404 /> },
      { path: "500", element: <Error500 /> },
    ],
  },
]);

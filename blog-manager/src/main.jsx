import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./app/router";
import { AuthProvider } from "./contexts/authContext.jsx";
import { ThemeProvider } from "./contexts/themeContext.jsx";
import { BlogProvider } from "./contexts/blogContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />,
      </BlogProvider>
    </AuthProvider>
  </ThemeProvider>,
);

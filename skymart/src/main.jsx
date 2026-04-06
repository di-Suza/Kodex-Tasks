import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./app/router.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { ToastProvider } from "./context/toastContext.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </ToastProvider>,
);

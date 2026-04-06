import { Navigate, Outlet, useLoaderData } from "react-router";
import Navbar from "../components/Navbar";
import SidebarCart from "../components/SidebarCart";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const { user } = useAuth();

  const { setProducts } = useProducts();

  let products = useLoaderData();

  useEffect(() => {
    setProducts(products);
  }, []);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#d4ff00]/30">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <SidebarCart />
      <Footer />
    </div>
  );
};

export default MainLayout;

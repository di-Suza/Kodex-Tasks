import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { LogOut, ShoppingCart, Menu, X } from "lucide-react";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleCart, cartItemsCount} = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      // Agar vertical scroll 0 se bada hai, toh false kardo
      if (window.scrollY > 0) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    // Event listener lagao
    window.addEventListener("scroll", handleScroll);

    // Cleanup function: Jab component unmount ho toh listener hata do (Performance ke liye)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all h-16 duration-300 ${
          !isAtTop
            ? "bg-black/80 backdrop-blur-md border-b border-white shadow-xl"
            : "bg-transparent border-b border-transparent "
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-[#d4ff00] rounded-xl flex items-center justify-center transition group-hover:scale-105">
              <svg
                className="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white tracking-tight">
              Sky<span className="font-bold text-[#d4ff00]">Mart</span>
            </span>
          </Link>

          {/* NAV LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Shop", "About"].map((item) => (
              <NavLink
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Shop"
                      ? "/products"
                      : `/${item.toLowerCase()}`
                }
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#d4ff00] ${
                    isActive ? "text-[#d4ff00]" : "text-gray-400"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* User Profile Chip */}
            <div className="hidden sm:flex items-center gap-3 bg-black/50 border border-gray-800 py-1.5 px-3 pr-4 rounded-xl shrink-0">
              <div className="w-6 h-6 bg-[#d4ff00] rounded-lg flex items-center justify-center text-black font-bold text-[10px] uppercase shrink-0 shadow-[0_0_10px_rgba(212,255,0,0.1)]">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm text-gray-300 font-medium truncate max-w-[80px]">
                {user?.name || "User"}
              </span>
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-2 cursor-pointer  bg-black border border-gray-800 rounded-xl text-gray-400 hover:text-[#d4ff00] transition group"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#d4ff00] text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Logout (Desktop Only) */}
            <button
              onClick={handleLogout}
              className=" md:flex p-2 bg-black border cursor-pointer border-gray-800 rounded-xl text-gray-400 hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden  cursor-pointer  p-2 bg-black border border-gray-800 rounded-xl text-gray-400 hover:text-[#d4ff00] transition"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (Wahi CSS Jo Tune Di Thi) */}
        <div
          className={`absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-gray-800 transition-all duration-300 overflow-hidden md:hidden ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-4 gap-4">
            {["Home", "Shop", "About"].map((item) => (
              <NavLink
                key={item}
                onClick={() => setIsMenuOpen(false)}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Shop"
                      ? "/products"
                      : `/${item.toLowerCase()}`
                }
                className="text-gray-400  cursor-pointer  font-medium hover:text-[#d4ff00] px-2 py-1"
              >
                {item}
              </NavLink>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center  cursor-pointer gap-2 text-red-500 font-medium px-2 py-1 border-t border-gray-800 pt-4"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

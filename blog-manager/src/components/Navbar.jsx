import { PenLine, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--primary) backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <PenLine className="  text-(--accent) w-6 h-6" />
          <span className="text-xl  text-(--text1) font-bold  font-sans">
            Inkwell
          </span>
        </div>

        <div className="flex items-center gap-6 w-1/4 justify-end">
          <button
            onClick={() => toggleTheme()}
            className="p-2 rounded-lg border cursor-pointer border-gray-300 border-none hover:text-(--text2) hover:bg-(--accent) transition-all"
          >
            {theme === "dark" ? (
              <Moon className="text-black-700 w-5 h-5" />
            ) : (
              <Sun className="text-white w-5 h-5" />
            )}
          </button>

          {user ? (
            <>
              <div
                className="relative flex items-center gap-4"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full cursor-pointer hover:bg-gray-800 dark:hover:bg-white/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-(--accent) flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-(--text1) font-semibold hidden md:block">
                    {user.name}
                  </span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 top-10 w-52 bg-(--secondary) border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-(--text1)">
                        {user.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 py-0.5 text-gray-500 text-[10px] font-bold uppercase rounded">
                        {user.role === "writer" ? "Author" : user.role}
                      </span>
                    </div>

                    <div className="px-3 py-1.5">
                      {user.role === "writer" && (
                        <button
                          onClick={() => {
                            navigate("/dashboard");
                            setIsOpen(false);
                          }}
                          className="w-full flex cursor-pointer items-center gap-3  py-1.5 text-sm text-(--text1) hover:bg-(--primary) rounded-lg transition-colors text-left"
                        >
                          <LayoutDashboard
                            size={18}
                            className="text-gray-400"
                          />
                          Dashboard
                        </button>
                      )}
                    </div>
                    <div className="px-3 py-1.5 border-t border-(--border)">
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full cursor-pointer flex items-center gap-3 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-left"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-sm font-medium text-(--text1) cursor-pointer hover:opacity-80"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/signUp")}
                className="bg-(--accent) text-(--text2) cursor-pointer px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

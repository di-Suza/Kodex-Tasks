import { NavLink, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { navItems } from "../utils/sidebar.config";

const Sidebar = ({ open }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-[#222e3c] z-30 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-5 py-4 border-b border-white/10 text-white font-bold">
          Admin<span className="text-blue-400">Kit</span>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map((group) => (
            <div key={group.section}>
              <p className="text-[10px] text-gray-500 uppercase px-2 mb-2">
                {group.section}
              </p>

              {group.items.map((item) => {
                const hasChildren = item.children;

                return (
                  <div key={item.label}>
                    {/* Parent Item */}
                    <div
                      onClick={() =>{
                        if(hasChildren) toggleMenu(item.label)
                        if(item.path) navigate(item.path)
                        }
                      }
                      className="flex justify-between px-2 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
                    >
                      <span className="flex gap-2 text-sm">
                        {item.icon}
                        {item.path ? (
                          <NavLink to={item.path}>{item.label}</NavLink>
                        ) : (
                          item.label
                        )}
                      </span>

                      <div className="flex gap-1">
                        {item.badge && (
                          <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1.5 rounded">
                            {item.badge}
                          </span>
                        )}
                        {hasChildren && <span>▾</span>}
                      </div>
                    </div>

                    {/* CHILDREN */}
                    {hasChildren && openMenus[item.label] && (
                      <div className="ml-4">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex justify-between px-3 py-1.5 text-xs rounded ${
                                isActive
                                  ? "text-white bg-blue-600"
                                  : "text-gray-400 hover:text-white hover:bg-white/5"
                              }`
                            }
                          >
                            <span>{child.label}</span>

                            {child.badge && (
                              <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1 rounded">
                                {child.badge}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
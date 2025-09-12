import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({ onMobileNavigate }) => {


  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigation = (path) => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile && onMobileNavigate) {
      onMobileNavigate();
    }
    navigate(path);
  };

  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard",
      icon: <HiOutlineHome className="w-5 h-5" />
    },
    { 
      path: "/requisition", 
      label: "Requisitions",
      icon: <IoDocumentTextOutline className="w-5 h-5" />
    },
    { 
      path: "/configuration", 
      label: "Configuration",
      icon: <IoSettingsOutline className="w-5 h-5" />
    },
  ];

  const isActive = (path) => {
    // Pour les routes commençant par /requisition
    if (path === '/requisition' && location.pathname.startsWith('/requisition')) {
      return true;
    }
    // Pour les autres routes
    return location.pathname === path;
  };


  return (
    <div
      className={`h-[calc(100vh-64px)]  text-white flex flex-col
                ${isCollapsed ? "w-16 md:w-20" : "w-56"}`}
    >


      {/* En-tête */}
      <div className="py-6">
        {!isCollapsed && (
          <h2 className="font-semibold text-lg tracking-wide px-2">
            Menu
          </h2>
        )}
      </div>

      {/* Menu principal */}
      <div className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map(
            (item) => {
             
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 py-3 px-4 mx-2 rounded-lg transition-all duration-200
                  ${isActive(item.path)
                    ? "bg-white/20 text-white shadow-sm backdrop-blur-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"}
                  `}
                >
                  <span className={`${isActive(item.path) ? "text-white" : "text-white/80"}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            }
          )}
        </ul>
      </div>

      {/* Profil utilisateur */}
      <div className="p-3">
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)} 
            className="flex cursor-pointer items-center gap-3 w-full rounded-lg p-2.5 transition-all duration-200
                     hover:bg-white/10 active:bg-white/20 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium">
               
              </span>
            </div>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

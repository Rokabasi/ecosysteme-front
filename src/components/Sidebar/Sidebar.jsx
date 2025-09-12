import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiOutlineCog, 
  HiOutlineChartSquareBar,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineDocumentReport
} from "react-icons/hi";

const Sidebar = ({ onMobileNavigate, isCollapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

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
      label: "Tableau de bord",
      icon: <HiOutlineChartSquareBar className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/requisition",
      label: "Requisitions",
      icon: <HiOutlineDocumentText className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/rapports",
      label: "Rapports",
      icon: <HiOutlineDocumentReport className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/calendrier",
      label: "Calendrier",
      icon: <HiOutlineCalendar className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/utilisateurs",
      label: "Utilisateurs",
      icon: <HiOutlineUsers className="w-5 h-5 flex-shrink-0" />,
      roles: ['admin']
    },
    {
      path: "/statistiques",
      label: "Statistiques",
      icon: <HiOutlineChartBar className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/configuration",
      label: "Configuration",
      icon: <HiOutlineCog className="w-5 h-5 flex-shrink-0" />,
      roles: ['admin']
    },
  ];

  const isActive = (path) => {
    if (path === "/requisition" && activePath.startsWith("/requisition")) {
      return true;
    }
    return activePath === path;
  };

  // Check if user has required role for menu item
  const hasPermission = (item) => {
    if (!item.roles) return true;
    // In a real app, check user roles against required roles
    return true; // For demo purposes
  };

  return (
    <div
      className={`h-[calc(100vh-4rem)] bg-[#0f172a] text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16 md:w-16" : "w-64"
      } shadow-lg`}
    >
      {/* Logo and app name */}
      
      
      {/* Menu principal */}
      <nav className="flex-1 px-2 pt-12 pb-4 space-y-1 overflow-y-auto ">
        {menuItems
          .filter(hasPermission)
          .map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  active
                    ? 'bg-[#6a1754] text-white'
                    : 'text-white/70 hover:bg-[#1e293b] hover:text-white'
                }`}
              >
                <span className={`transition-colors duration-200 ${active ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3 truncate text-white">
                    {item.label}
                  </span>
                )}
                
              </Link>
            );
          })}
      </nav>
    </div>
  );
};

export default Sidebar;

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
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { canAccessConfiguration, canAccessCandidatures, canAccessDossiers } from "../../utils/permissions";

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
      path: "/admin",
      label: "Dashboard",
      icon: <HiOutlineChartSquareBar className="w-5 h-5 flex-shrink-0" />,
      permission: null,
    },
    {
      path: "/admin/candidatures",
      label: "Candidatures",
      icon: <HiOutlineChartSquareBar className="w-5 h-5 flex-shrink-0" />,
      permission: "candidatures",
    },
    {
      path: "/admin/dossiers",
      label: "Dossiers",
      icon: <HiOutlineChartSquareBar className="w-5 h-5 flex-shrink-0" />,
      permission: "dossiers",
    },
    {
      path: "/admin/configuration",
      label: "Configuration",
      icon: <HiOutlineCog className="w-5 h-5 flex-shrink-0" />,
      permission: "configuration",
    },
  ];

  const isActive = (path) => {
    // Pour les candidatures, activer si la route commence par /admin/candidatures
    if (path === "/admin/candidatures" && activePath.startsWith("/admin/candidatures")) {
      return true;
    }
    // Pour la configuration, activer si la route commence par /admin/configuration
    if (path === "/admin/configuration" && activePath.startsWith("/admin/configuration")) {
      return true;
    }
    // Pour les dossiers, activer si la route commence par /dossiers
    if (path === "/admin/dossiers" && activePath.startsWith("/admin/dossiers")) {
      return true;
    }
    // Pour le dashboard, activer seulement si c'est exactement /admin
    if (path === "/admin") {
      return activePath === "/admin";
    }
    // Logique existante pour requisition
    if (path === "/requisition" && activePath.startsWith("/requisition")) {
      return true;
    }
    return activePath === path;
  };

  // Check if user has required role for menu item
  const hasPermission = (permission) => {
    if (!permission) return true;
    
    switch (permission) {
      case 'configuration':
        return canAccessConfiguration();
      case 'candidatures':
        return canAccessCandidatures();
      case 'dossiers':
        return canAccessDossiers();
      default:
        return true;
    }
  };

  return (
    <div className="h-full w-full text-white flex flex-col">


      {/* Menu principal */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto pt-12">
        {menuItems
          .filter(item => hasPermission(item.permission))
          .map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  active
                    ? "bg-[#6a1754] text-white"
                    : "text-white/70 hover:bg-[#1e293b] hover:text-white"
                }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    active ? "text-white" : "text-white/90 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3 truncate text-white">{item.label}</span>
                )}
              </Link>
            );
          })}
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({ onMobileNavigate, isCollapsed = false }) => {
  const navigate = useNavigate();
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
      label: "Tableau de bord",
      icon: <HiOutlineHome className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/requisition",
      label: "Requisitions",
      icon: <IoDocumentTextOutline className="w-5 h-5 flex-shrink-0" />,
    },
    {
      path: "/configuration",
      label: "Configuration",
      icon: <IoSettingsOutline className="w-5 h-5 flex-shrink-0" />,
    },
  ];

  const isActive = (path) => {
    // Pour les routes commençant par /requisition
    if (
      path === "/requisition" &&
      location.pathname.startsWith("/requisition")
    ) {
      return true;
    }
    // Pour les autres routes
    return location.pathname === path;
  };

  return (
    <div
      className={`h-[calc(100vh-64px)] bg-[#8e1f71] text-white flex flex-col border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16 md:w-20" : "w-60"
      }`}
    >
      {/* En-tête */}

      {/* Menu principal */}
      <div className="flex-1 px-2 overflow-y-auto pt-12">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 mx-1 ${
                  isActive(item.path)
                    ? "bg-white/20 !text-white shadow-md"
                    : "!text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`${
                    isActive(item.path) ? "text-white" : "!text-white/90"
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

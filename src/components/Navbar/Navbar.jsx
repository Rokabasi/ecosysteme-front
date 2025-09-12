import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiChevronDown, FiMail, FiBriefcase, FiAward } from "react-icons/fi";
import Logo from "../../assets/fonarev-logo.webp";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@fonarev.cd",
  department: "Direction des Systèmes d'Information",
  position: "Chef de Projet",
  role: "Administrateur"
};

const NavBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-16 shadow-sm">
      <div className=" px-4  h-full">
        <div className="flex justify-between  h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
            <span className="ml-2 text-lg font-semibold text-gray-900 hidden md:inline-block">
              Ecosystème
            </span>
          </Link>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex items-center space-x-2 p-0 mt-4 m-0 border-0 !bg-white"
              style={{
                outline: 'none',
                boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsUserMenuOpen(!isUserMenuOpen);
              }}
              onMouseDown={e => e.preventDefault()}
              onFocus={e => e.target.blur()}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#8e1f71] to-[#0089cf] flex items-center justify-center text-white">
                <FiUser className="h-5 w-5" />
              </div>
              <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 bg-gradient-to-r from-[#8e1f71] to-[#6a1754] text-white">
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                      <FiUser className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{userData.name}</h3>
                      <p className="text-sm text-white/90">{userData.role}</p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <FiMail className="h-5 w-5 text-[#8e1f71] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-800">{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiBriefcase className="h-5 w-5 text-[#8e1f71] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Direction</p>
                      <p className="text-sm text-gray-800">{userData.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FiAward className="h-5 w-5 text-[#8e1f71] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Fonction</p>
                      <p className="text-sm text-gray-800">{userData.position}</p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="border-t border-gray-200 p-2 bg-gray-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
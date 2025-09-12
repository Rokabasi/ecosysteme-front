import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/fonarev-logo.webp";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();


  const menuItems = [
    { path: '/', label: 'Tableau de bord' },
    { path: '/requisition', label: 'Requisitions' },
    { path: '/configuration', label: 'Configuration', roles: ['admin'] },
  ];

  const isActive = (path) => location.pathname === path;



  return (
    <>
      <nav className="bg-white border-b border-gray-200 h-16">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-base hidden md:block lg:text-lg md:text-sm sm:text-xs font-semibold text-gray-900">Ecosystem</span>
            </Link>
            <div className="h-6 w-px hidden md:block bg-gray-200" />

          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`
        fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white transform transition-transform duration-300 ease-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4">
            {menuItems.map((item) => (
              (!item.roles) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
};

export default NavBar;
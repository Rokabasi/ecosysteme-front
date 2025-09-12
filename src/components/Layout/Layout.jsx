import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      
      // On larger screens, always show the sidebar
      if (!isMobileView) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMobileNavigate = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <NavBar 
          onMenuToggle={toggleSidebar}
          //onLogout={handleLogout}
        />
      </div>

      <div className="flex flex-1 pt-16 w-full">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-30 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
          style={{
            width: isMobile ? '16rem' : '16rem',
            transitionProperty: 'transform',
            flexShrink: 0
          }}
        >
          <Sidebar onMobileNavigate={handleMobileNavigate} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 w-full min-w-0 bg-white">
          <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6 w-full">
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
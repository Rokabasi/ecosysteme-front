import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../Navbar/Navbar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when route changes on mobile
  const handleMobileNavigate = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col border">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <NavBar 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onMenuToggle={toggleSidebar}
        />
      </div>

      <div className="flex flex-1 pt-16 border ">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-30 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0`}
          style={{
            width: isMobile ? '16rem' : '16rem',
            transitionProperty: 'transform',
            transitionDuration: '300ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Sidebar 
            isCollapsed={false}
            onMobileNavigate={handleMobileNavigate}
          />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 bg-gray-50 transition-all duration-300 ease-in-out border">
          <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6">
            <div className="max-w-full mx-auto">
              <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
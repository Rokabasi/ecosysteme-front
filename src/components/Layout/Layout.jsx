import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../Navbar/Navbar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    // Replace this with your actual authentication check
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    // Update authentication state
    setIsAuthenticated(false);
  };

  // Close sidebar when route changes on mobile
  const handleMobileNavigate = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-white bg-[#1f4e79] hover:bg-[#1a4268] transition-colors"
          aria-label="Toggle menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <div 
          className={`fixed left-0 top-16 bottom-0 z-40 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static`}
        >
          <Sidebar 
            isCollapsed={false}
            onMobileNavigate={handleMobileNavigate} 
          />
        </div>

        {/* Page content */}
        <div className={`w-full transition-all duration-300`}>
          <main className="min-h-[calc(100vh-64px)] p-4 md:p-6 w-full">
            <div className="w-full border overflow-x-auto">
              <Outlet context={{ isAuthenticated, setIsAuthenticated }} />
            </div>
          </main>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      
    </div>
  );
}

export default Layout;
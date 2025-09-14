import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionStorage, deleteSessionToken } from '../../config/auth';
import Sidebar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';

const Layout = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Vérifier l'authentification avant de rendre le layout
    const checkAuth = () => {
      try {
        const session = getSessionStorage();
        const token = session.getSessionToken();
        if (!token) {
          navigate('/auth/login', { state: { from: window.location.pathname } });
          return;
        }
      } catch (error) {
        console.error('Erreur de vérification de session:', error);
        navigate('/auth/login', { state: { from: window.location.pathname } });
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

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

  const handleLogout = () => {
    try {
      getSessionStorage().deleteSessionToken();
      if (onLogout) onLogout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMobileNavigate = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40">
        <NavBar onMenuToggle={toggleSidebar} onLogout={handleLogout} />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed top-16 left-0 bottom-0 w-64 bg-[#0f172a] transform transition-transform duration-300 ease-in-out z-30 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar onMobileNavigate={handleMobileNavigate} />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main 
          className={`flex-1 min-w-0 transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : ''
          }`}
        >
          <div className="p-4 md:p-6 w-full">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
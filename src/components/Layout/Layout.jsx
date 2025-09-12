
import { Outlet } from "react-router";
import { useState } from "react";
import { HiMenu, HiOutlineBell } from "react-icons/hi";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "../Navbar/Navbar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
        {/* Bouton hamburger pour mobile */}
        <div className="lg:hidden fixed top-4 right-4 flex items-center gap-2 z-50">
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <HiOutlineBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <HiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="pt-16 flex">
        <div className={`fixed left-0 top-16 bottom-0 z-[60] ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar onMobileNavigate={() => setIsSidebarOpen(false)} />
        </div>
        <div className={`w-full lg:pl-56`}>
          <main className="bg-slate-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-[100vw] overflow-x-hidden">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

// Import your login component (you'll need to create this)
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated (you might want to move this to a context or auth service)
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    // if (!checkAuth()) {
    //   return <Navigate to="/login" replace />;
    // }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        } /> */}
        
        {/* Protected routes */}
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<div className="p-6">Tableau de bord</div>} />
          <Route path="/requisition" element={<div className="">Requisitions</div>} />
          <Route path="/configuration" element={<div className="p-6">Configuration</div>} />
        </Route>
        
        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

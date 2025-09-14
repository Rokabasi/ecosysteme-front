import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import CheckStatut from "./pages/CheckStatut/CheckStatut";
import Home from "./pages/Home/Home";
import Configuration from "./pages/Configuration/Configuration";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import Login from "./pages/Auth/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification (à remplacer par une vraie vérification)
  useEffect(() => {
    // Ici, vous pourriez vérifier un token dans le localStorage
    // const token = localStorage.getItem('authToken');
    // setIsAuthenticated(!!token);
  }, []);

  return (
    <Routes>
      {/* Route racine */}
      <Route path="/" element={<Home />} />
      
      {/* Routes d'authentification */}
      <Route path="/auth">
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={
          !isAuthenticated ? (
            <Login onLogin={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/admin" replace />
          )
        } />
      </Route>
      
      {/* Routes publiques */}
      <Route path="/register" element={<Register />} />
      <Route path="/check-status" element={<CheckStatut />} />
      
      {/* Routes protégées */}
      <Route 
        path="/admin" 
        element={
          isAuthenticated ? (
            <Layout onLogout={() => setIsAuthenticated(false)} />
          ) : (
            <Navigate to="/auth/login" state={{ from: '/admin' }} replace />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="requisition" element={<div className="p-6">Requisitions</div>} />
        <Route path="configuration" element={<Configuration />} />
      </Route>
      
      {/* Redirection pour les routes inconnues */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

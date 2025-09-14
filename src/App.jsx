import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import CheckStatut from "./pages/CheckStatut/CheckStatut";
import Home from "./pages/Home/Home";
import Configuration from "./pages/Configuration/Configuration";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "./config/auth";
import Login from "./pages/Auth/Login";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    try {
      const session = getSessionStorage();
      const token = session.getSessionToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log('Aucune session valide trouvée:', error.message);
      setIsAuthenticated(false);
    }
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    try {
      const session = getSessionStorage();
      session.deleteSessionToken();
      setIsAuthenticated(false);
      navigate('/auth/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

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
            <Layout onLogout={handleLogout} />
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

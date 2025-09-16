import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import CheckStatut from "./pages/CheckStatut/CheckStatut";
import Home from "./pages/Home/Home";
import Configuration from "./pages/Configuration/Configuration";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Candidatures from "./pages/Candidatures/Candidatures";
import CandidatureDetail from './pages/Candidatures/CandidatureDetail/CandidatureDetail';
import Dossiers from './pages/Dossiers/Dossiers';
import DossierDetail from './pages/Dossiers/DossierDetail/DossierDetail';

function App() {
  return (
    <Routes>
      {/* Route racine et routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/check-status" element={<CheckStatut />} />

      {/* Routes Protégées englobées par ProtectedRoutes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="candidatures" element={
            <ProtectedRoute requiredPermission="candidatures">
              <Candidatures />
            </ProtectedRoute>
          } />
           <Route path="dossiers" element={
             <ProtectedRoute requiredPermission="dossiers">
              <Dossiers />
             </ProtectedRoute>
          } />
          <Route path="candidatures/:id" element={
            <ProtectedRoute requiredPermission="candidatures">
              <CandidatureDetail />
            </ProtectedRoute>
          } />
          <Route path="dossiers/:id" element={
            <ProtectedRoute requiredPermission="dossiers">
              <DossierDetail />
            </ProtectedRoute>
          } />
          <Route path="configuration" element={
            <ProtectedRoute requiredPermission="configuration">
              <Configuration />
            </ProtectedRoute>
          } />
        </Route>
      </Route>

      {/* Redirection pour les routes non trouvées */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

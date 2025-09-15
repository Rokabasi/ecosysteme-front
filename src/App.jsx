import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
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
          <Route path="candidatures" element={<Candidatures />} />
          <Route path="candidatures/:id" element={<CandidatureDetail />} />
          <Route path="configuration" element={<Configuration />} />
        </Route>
      </Route>

      {/* Redirection pour les routes non trouvées */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

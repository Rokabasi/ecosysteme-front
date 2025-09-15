import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSessionStorage } from '../../config/auth';

const ProtectedRoutes = () => {
  const { getSessionUser } = getSessionStorage();
  const user = getSessionUser();

  if (!user) {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    return <Navigate to="/auth/login" replace />;
  }

  // Si l'utilisateur est connecté, on affiche la route demandée
  return <Outlet />;
};

export default ProtectedRoutes;

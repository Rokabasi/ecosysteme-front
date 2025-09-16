import React from 'react';
import { Navigate } from 'react-router-dom';
import { canAccessConfiguration, canAccessCandidatures, canAccessDossiers } from '../../utils/permissions';

const ProtectedRoute = ({ children, requiredPermission }) => {
  let hasPermission = false;

  switch (requiredPermission) {
    case 'configuration':
      hasPermission = canAccessConfiguration();
      break;
    case 'candidatures':
      hasPermission = canAccessCandidatures();
      break;
      case 'dossiers':
      hasPermission = canAccessDossiers();
    default:
      hasPermission = true;
  }

  if (!hasPermission) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;

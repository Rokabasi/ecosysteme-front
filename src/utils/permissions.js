import { getSessionUser } from '../config/auth';

// Fonctions spécifiques pour chaque section basées sur les vraies données utilisateur
export const canAccessConfiguration = () => {
  const user = getSessionUser();

  if (!user) return false;  
  return user.direction === 'NUMERIQUE' && user.profil === 'admin';
};

export const canAccessCandidatures = () => {
  const user = getSessionUser();
  
  if (!user) return false;
  return user.direction === 'AUDIT' && user.profil === 'Controleur';
};

export const canAccessDossiers = () => {
  const user = getSessionUser();
  
  if (!user) return false;
  
  return ((user.direction === 'AUDIT') && ( user.profil === 'Controleur')) ||((user.direction === 'FINANCE') && ( user.profil === 'Financier')) || ((user.direction === 'JURIDIQUE') && ( user.profil === 'Juriste')) || ((user.direction === 'AUDIT') && ( user.profil === 'Auditeur')) || ((user.direction === 'ETUDES' || user.direction === 'REPARATIONS' || user.direction === 'ACCES A LA JUSTICE' ) && ( user.profil === 'Analyste' || user.profil === 'Directeur'));
};

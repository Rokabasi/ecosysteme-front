import { jwtDecode } from "jwt-decode";
import { protectedAxios, protectedSendFileAxios } from "./axios";

// Fonction utilitaire pour vérifier si le token a expiré
const checkTokenExpiration = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return true;
  }
};

// Fonction pour gérer le stockage de session
export const getSessionStorage = () => {
  const storage = sessionStorage;
  
  const getSessionToken = () => {
    const token = storage.getItem('u_token');
    if (!token) throw new Error('Aucun token trouvé');
    if (checkTokenExpiration(token)) {
      storage.removeItem('u_token');
      storage.removeItem('u_user');
      throw new Error('Session expirée');
    }
    return token;
  };

  const getSessionUser = () => {
    const user = storage.getItem('u_user');
    return user ? JSON.parse(user) : null;
  };

  const saveSessionToken = (user) => {
    if (!user?.usr_token) {
      throw new Error('Token utilisateur manquant');
    }
    
    storage.setItem('u_token', user.usr_token);
    storage.setItem('u_user', JSON.stringify(user));
    
    // Mise à jour des en-têtes Axios
    protectedAxios.defaults.headers.common['x-access-token'] = user.usr_token;
    protectedSendFileAxios.defaults.headers.common['x-access-token'] = user.usr_token;
  };

  const deleteSessionToken = () => {
    storage.removeItem('u_token');
    storage.removeItem('u_user');
    delete protectedAxios.defaults.headers.common['x-access-token'];
    delete protectedSendFileAxios.defaults.headers.common['x-access-token'];
  };

  const isTokenExpired = () => {
    const token = storage.getItem('u_token');
    return checkTokenExpiration(token);
  };

  return { 
    getSessionToken, 
    saveSessionToken, 
    deleteSessionToken, 
    getSessionUser, 
    isTokenExpired 
  };
};

// Exporter les fonctions individuelles pour une utilisation directe
const auth = {
  saveSessionToken: (user) => {
    const session = getSessionStorage();
    return session.saveSessionToken(user);
  },
  
  deleteSessionToken: () => {
    const session = getSessionStorage();
    return session.deleteSessionToken();
  },
  
  isTokenExpired: () => {
    const session = getSessionStorage();
    return session.isTokenExpired();
  },
  
  getSessionUser: () => {
    const session = getSessionStorage();
    return session.getSessionUser();
  }
};

export const { 
  saveSessionToken, 
  deleteSessionToken, 
  isTokenExpired,
  getSessionUser 
} = auth;
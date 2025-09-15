import Axios from "axios";
import { getSessionStorage } from "./auth";

const url = import.meta.env.VITE_REMOTE_URL || "http://localhost:3000";

// Création des instances Axios
const axios = Axios.create({ baseURL: url });
const protectedAxios = Axios.create({ baseURL: url });
const protectedSendFileAxios = Axios.create({
  baseURL: url,
  timeout: 60000,
  maxContentLength: 60 * 1024 * 1024,
  maxBodyLength: 60 * 1024 * 1024,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Intercepteur pour injecter le token d'authentification
const authInterceptor = (config) => {
  try {
    const token = getSessionStorage().getSessionToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  } catch (error) {
    console.error("Erreur lors de l'ajout du token d'authentification:", error);
    return Promise.reject(error);
  }
};

// Intercepteur de réponse pour gérer les erreurs 401
const errorInterceptor = (error) => {
  if (error.response?.status === 401) {
    // Token expiré ou invalide, déconnecter l'utilisateur
    getSessionStorage().deleteSessionToken();
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
};

// Ajout des intercepteurs aux instances protégées
[protectedAxios, protectedSendFileAxios].forEach((instance) => {
  instance.interceptors.request.use(authInterceptor);
  instance.interceptors.response.use((response) => response, errorInterceptor);
});

export { axios, protectedAxios, protectedSendFileAxios };

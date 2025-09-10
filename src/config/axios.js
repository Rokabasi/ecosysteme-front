import Axios from "axios";

const url = import.meta.env.VITE_REMOTE_URL;

// Créez des instances sans token initial
const axios = Axios.create({ baseURL: url });

const protectedAxios = Axios.create({ baseURL: url, withCredentials: true });
const protectedSendFileAxios = Axios.create({
  baseURL: url,
  withCredentials: true,
  timeout: 60000, // Augmenter le timeout à 60 secondes pour les fichiers volumineux
  maxContentLength: 60 * 1024 * 1024, // Limite à 40MB
  maxBodyLength: 60 * 1024 * 1024, // Limite à 40MB
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Intercepteur pour injecter dynamiquement le toke

// Appliquez les intercepteurs

// Intercepteur de réponse commun


export { axios, protectedAxios, protectedSendFileAxios };

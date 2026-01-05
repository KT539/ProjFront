// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://www.omdbapi.com/", // OMDb API
  timeout: 5000,
});

// Ajouter la clé API automatiquement à chaque requête
axiosClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: import.meta.env.VITE_API_KEY, // vérifie le nom exact dans ton .env
  };
  return config;
});

// Logs pour debugging
axiosClient.interceptors.request.use((config) => {
  console.log("Requête OMDb :", config.url, config.params);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API :", error);
    return Promise.reject(error);
  }
);

export default axiosClient;

import axios from "axios";

const omdbClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ex: https://www.omdbapi.com/
  timeout: 5000,
});

omdbClient.interceptors.request.use((config) => {
  // Ajoute automatiquement la clé API à chaque requête
  config.params = {
    ...config.params,
    apikey: import.meta.env.VITE_API_KEY
  };
  return config;
});

export default omdbClient; // <-- N'oublie pas le export

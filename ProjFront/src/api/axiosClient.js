import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL de ton API (définit dans .env)
  timeout: 5000,
});

omdbClient.interceptors.request.use((config) => {
  // ajoute la clé API à CHAQUE requête
  config.params = {
    ...config.params,
    apikey: import.meta.env.VITE_API_KEY
  };
  return config;
});

// Intercepteur : ajouter des logs ou un token
axiosClient.interceptors.request.use((config) => {
  console.log("requête envoyé :", config.url)
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(" Erreur API :", error)
    return Promise.reject(error)
  })

export default axiosClient;


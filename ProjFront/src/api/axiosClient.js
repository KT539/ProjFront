import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/movies", // ton backend proxy
});

export default axiosClient;

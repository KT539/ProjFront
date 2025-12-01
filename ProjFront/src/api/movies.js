import axios from "axios";
/*
const api = axios.create({
  baseURL: "http://localhost:3000/movies"
});

export function getMovieById(id) {
  return api.get(`/${id}`).then(res => res.data);
}

export function searchMovies(params) {
  return api.get("/search", { params }).then(res => res.data);
}

 */
// Films “à la Une” (liste prédéfinie d’IDs OMDb ou titres populaires)
export const featuredMovies = async () => {
  const ids = ["tt0499549","tt0133093","tt0110912"]; // Avatar, Matrix, Pulp Fiction
  const promises = ids.map(id => axios.get(`/movies/${id}`));
  const results = await Promise.all(promises);
  return results.map(r => r.data);
};

// Recherche par titre ou ID
export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await axios.get("/movies/search", {
    params: { title: query }
  });
  return res.data;
};

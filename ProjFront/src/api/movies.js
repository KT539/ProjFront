// src/api/movies.js
import axiosClient from "./axiosClient.js";

// Films à la une (par IDs)
export const featuredMovies = async () => {
  const ids = ["tt0499549","tt0133093","tt0110912"]; // Avatar, Matrix, Pulp Fiction
  const promises = ids.map((id) =>
    axiosClient.get("/", { params: { i: id } })
  );

  const responses = await Promise.all(promises);

  return responses
    .map((r) => r.data)
    .filter((m) => m && m.Response === "True");
};

// Recherche permissive par titre
export const searchMovies = async (query) => {
  if (!query) return [];

  let allMovies = [];

  // OMDb renvoie 10 résultats par page, on peut parcourir jusqu'à 5 pages
  for (let page = 1; page <= 5; page++) {
    const res = await axiosClient.get("/", { params: { s: query, page } });

    if (!res.data || res.data.Response !== "True" || !res.data.Search) break;

    // Filtre local pour inclure tous les titres contenant la recherche
    const filteredPage = res.data.Search.filter(movie =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );

    allMovies = [...allMovies, ...filteredPage];

    if (res.data.Search.length < 10) break; // pas de page suivante
  }

  return allMovies;
};

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

// Recherche par titre sur plusieurs pages pour être permissif
export const searchMovies = async (query) => {
  if (!query) return [];

  let allMovies = [];

  // OMDb renvoie 10 résultats par page, on va chercher les 5 premières pages max
  for (let page = 1; page <= 5; page++) {
    const res = await axiosClient.get("/", { params: { s: query, page } });

    if (res.data.Response !== "True" || !res.data.Search) break;

    const filteredPage = res.data.Search.filter(movie =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );

    allMovies = [...allMovies, ...filteredPage];

    // Si moins de 10 résultats, on sait qu'il n'y a plus de page
    if (res.data.Search.length < 10) break;
  }

  return allMovies;
};

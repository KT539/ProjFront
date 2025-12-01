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

// Recherche par titre
export const searchMovies = async (query) => {
  if (!query) return [];

  const res = await axiosClient.get("/", { params: { s: query } });

  return res.data.Response === "True" ? res.data.Search : [];
};

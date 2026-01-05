import { defineStore } from "pinia";
import { getMovieByTitle } from "@/api/omdbApi";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movie: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMovie(title) {
      this.loading = true;
      this.error = null;
      try {
        const response = await getMovieByTitle(title);
        console.log("RESPONSE OMDB :", response.data);
        this.movie = response.data;
      } catch (e) {
        console.error("Erreur API :", e);
        this.error = "Erreur lors de la récupération du film";
      } finally {
        this.loading = false;
      }
    },
  },
});

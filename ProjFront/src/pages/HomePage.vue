<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movie";

import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import { featuredMovies, searchMovies } from "../api/movies"; // si tu veux garder les fonctions API externes

// --- Store Pinia ---
const movieStore = useMovieStore();
const { movie, loading, error } = storeToRefs(movieStore);

// --- Local state pour la liste ----
const movies = ref([]);

// Charger les films "à la une"
const loadFeatured = async () => {
  try {
    movies.value = await featuredMovies();
  } catch (err) {
    console.error(err);
  }
};

// Recherche de films (via OMDB -> Pinia)
const handleSearch = async (query) => {
  if (!query) {
    await loadFeatured();
    return;
  }

  try {
    // Appelle ton store OMDB
    await movieStore.fetchMovie(query);

    // Si tu veux afficher une liste → OMDB renvoie 1 film → on crée un tableau
    movies.value = movie.value ? [movie.value] : [];
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await loadFeatured();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Films</h1>

    <SearchBar @search="handleSearch" />

    <!-- Erreur OMDB -->
    <div v-if="error" class="text-red-500 my-3">
      Erreur : {{ error }}
    </div>

    <!-- Loader Pinia -->
    <div v-if="loading" class="text-gray-500 mb-3">
      Chargement...
    </div>

    <!-- Affichage liste (featured ou résultat OMDB) -->
    <MovieList :movies="movies" />
  </div>
</template>

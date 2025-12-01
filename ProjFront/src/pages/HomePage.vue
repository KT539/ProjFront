<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Films</h1>

    <SearchBar @search="handleSearch" />

    <div v-if="loading" class="text-gray-500 mb-3">
      Chargement...
    </div>

    <div v-if="error" class="text-red-500 my-3">
      Erreur : {{ error }}
    </div>

    <MovieList :movies="movies" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import { featuredMovies, searchMovies } from "../api/movies.js";

const movies = ref([]);
const loading = ref(false);
const error = ref(null);

const loadFeatured = async () => {
  loading.value = true;
  error.value = null;
  try {
    movies.value = await featuredMovies();
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors du chargement des films à la une";
  } finally {
    loading.value = false;
  }
};

const handleSearch = async (query) => {
  if (!query) {
    await loadFeatured();
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const results = await searchMovies(query);
    movies.value = Array.isArray(results) ? results : [];
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors de la recherche";
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadFeatured();
});
</script>

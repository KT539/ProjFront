<template>
  <DefaultLayout>
    <div class="px-6 pt-6 pb-2">
      <h1 class="text-3xl font-bold text-gray-800">Recherche de films 🎬</h1>
      <p class="text-gray-600 mt-1">Explore la base de données OMDb (via API Proxy).</p>
    </div>

    <ElementFilters @filter="applyFilters" />

    <div class="px-6 py-4">
      <Loader v-if="loading" />

      <ElementList
        v-else-if="movies.length"
        :elements="movies"
      />

      <p v-else class="text-center text-gray-500 mt-10">Aucun film trouvé.</p>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ElementFilters from "../components/elements/ElementFilters.vue";
import ElementList from "../components/elements/ElementList.vue";
import Loader from "../components/ui/Loader.vue";

import { searchMovies } from "../api/movies";

// ------------------------------------------
const movies = ref([]);
const loading = ref(false);

const filters = ref({
  title: "Batman",
  year: "",
  genre: ""
});

// ------------------------------------------
const fetchMovies = async () => {
  loading.value = true;
  try {
    movies.value = await searchMovies(
      filters.value.title,
      filters.value.year,
      filters.value.genre
    );
  } catch (error) {
    console.error("Erreur API backend:", error);
  } finally {
    loading.value = false;
  }
};

// ------------------------------------------
const applyFilters = (newFilters) => {
  filters.value = newFilters;
  fetchMovies();
};

// Chargement initial
console.log("Avant fetchMovies");
fetchMovies();
console.log("Après fetchMovies");
</script>

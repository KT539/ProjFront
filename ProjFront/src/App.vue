<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Recherche de films 🎬</h1>

    <input
      v-model="title"
      placeholder="Titre du film"
      class="border p-2 rounded w-full max-w-md mb-4"
    />
    <button
      @click="fetchMovies"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Rechercher
    </button>

    <div v-if="loading" class="mt-4">Chargement...</div>

    <div v-else class="mt-4 space-y-2">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="border p-4 rounded shadow"
      >
        <h2 class="font-bold text-xl">{{ movie.title }}</h2>
        <p>{{ movie.year }}</p>
        <p>{{ movie.genre }}</p>
      </div>

      <div v-if="movies.length === 0" class="text-gray-500 mt-4">
        Aucun film trouvé.
      </div>
    </div>

    <div v-if="error" class="text-red-500 mt-4">
      Erreur : {{ error.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { searchMovies } from "./api/movies.js";

const title = ref("Avatar");
const movies = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchMovies = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await searchMovies(title.value);
    movies.value = data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// Chargement initial
fetchMovies();
</script>

<style>
/* Styles globaux si nécessaire */
</style>

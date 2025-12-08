<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">🎬 Films</h1>

      <button
        @click="router.push('/favorites')"
        class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition"
      >
        Mes Favoris
      </button>
    </header>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Messages -->
    <div v-if="loading" class="text-gray-400 mb-3 text-center">
      Chargement...
    </div>

    <div v-if="error" class="text-red-500 my-3 text-center">
      Erreur : {{ error }}
    </div>

    <!-- Liste des films -->
    <div
      v-if="movies.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        @click="goToDetails(movie.imdbID)"
        class="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
      >
        <!-- Poster -->
        <div class="aspect-[2/3] w-full bg-gray-700 overflow-hidden">
          <img
            :src="movie.Poster !== 'N/A' ? movie.Poster : fallback"
            class="w-full h-full object-cover"
            alt="Poster"
          />
        </div>

        <!-- Infos -->
        <div class="p-4">
          <h3 class="text-xl font-semibold truncate">{{ movie.Title }}</h3>
          <p class="text-gray-400 text-sm mb-2">{{ movie.Year }}</p>

          <!-- Badges genre -->
          <div class="flex flex-wrap gap-1">
        <span
          v-for="genre in movie.Genre ? movie.Genre.split(', ') : []"
          :key="genre"
          class="px-2 py-1 bg-gray-700 rounded text-xs"
        >
          {{ genre }}
        </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Aucun film -->
    <div v-else class="text-center text-gray-400 mt-12 text-xl">
      Aucun film trouvé pour le moment.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import { featuredMovies, searchMovies } from "../api/movies.js";

const router = useRouter();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

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

const goToDetails = (id) => {
  router.push({ name: "movie-details", params: { id } });
};

onMounted(async () => {
  await loadFeatured();
});
</script>

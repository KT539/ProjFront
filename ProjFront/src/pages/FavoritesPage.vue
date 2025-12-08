<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">

    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">⭐ Mes Favoris</h1>

      <button
        @click="router.push('/')"
        class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition"
      >
        Accueil
      </button>
    </header>

    <!-- Aucun favoris -->
    <div v-if="movies.length === 0" class="text-center text-gray-400 mt-12">
      <p class="text-xl">Vous n’avez aucun film en favori pour le moment.</p>
    </div>

    <!-- Liste des favoris -->
    <div
      v-else
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
          <h3 class="text-xl font-semibold truncate">
            {{ movie.Title }}
          </h3>

          <p class="text-gray-400 text-sm mb-2">{{ movie.Year }}</p>

          <!-- Badges genre -->
          <div class="flex flex-wrap gap-1">
            <span
              v-for="genre in movie.Genre.split(', ')"
              :key="genre"
              class="px-2 py-1 bg-gray-700 rounded text-xs"
            >
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFavorites } from "../utils/favorites.js";
import { getMovieById } from "../api/omdbApi.js";
import { useRouter } from "vue-router";

const router = useRouter();
const movies = ref([]);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

function goToDetails(id) {
  router.push({ name: "movie-details", params: { id } });
}

onMounted(async () => {
  const favorites = getFavorites();

  movies.value = await Promise.all(
    favorites.map(async (id) => {
      const res = await getMovieById(id);
      return res.data.Response === "True" ? res.data : null;
    })
  );

  movies.value = movies.value.filter(m => m !== null);
});
</script>

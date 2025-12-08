<template>
  <div class="min-h-screen bg-gray-900 text-white p-6 relative">
    <!-- Bouton Favoris -->
    <button
      @click="goToFavorites"
      class="fixed top-4 right-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition z-50"
    >
      ⭐ Favoris
    </button>

    <div v-if="movie" class="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 mt-12">

      <!-- Titre -->
      <h1 class="text-3xl font-bold mb-4">{{ movie.Title }}</h1>

      <div class="flex flex-col md:flex-row gap-6">

        <!-- Affiche -->
        <div class="flex-shrink-0 w-full md:w-1/3 bg-gray-700 rounded-lg overflow-hidden">
          <img
            :src="movie.Poster !== 'N/A' ? movie.Poster : fallback"
            alt="Poster"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Infos -->
        <div class="flex-1 flex flex-col gap-2">
          <p><strong>Année :</strong> {{ movie.Year }}</p>
          <p><strong>Genre :</strong> {{ movie.Genre }}</p>
          <p><strong>IMDb :</strong> {{ movie.imdbRating }}</p>
          <p><strong>Synopsis :</strong> {{ movie.Plot }}</p>

          <!-- Bouton Ajouter/Supprimer des favoris -->
          <button
            @click="toggle"
            class="mt-4 px-4 py-2 rounded-lg shadow w-max transition"
            :class="isFavorite ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'"
          >
            {{ isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris' }}
          </button>
        </div>
      </div>

    </div>

    <!-- Chargement -->
    <p v-else class="text-center text-gray-400 mt-12 text-xl">Chargement...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosClient from "@/api/axiosClient.js";
import {useHistoryStore} from "@/stores/history.js";
import { toggleFavorite, getFavorites } from "../utils/favorites.js";

const router = useRouter();
const route = useRoute();
const movie = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";
const historyStore = useHistoryStore()

// ref pour forcer la réactivité du bouton
const favoritesList = ref(getFavorites());

const isFavorite = computed(() => {
  return movie.value ? favoritesList.value.includes(movie.value.imdbID) : false;
});

function toggle() {
  if (movie.value) {
    toggleFavorite(movie.value.imdbID);
    // met à jour le ref pour déclencher le recalcul du computed
    favoritesList.value = getFavorites();
  }
}

function goToFavorites() {
  router.push({ name: "favorites" });
}

onMounted(async () => {
  try {
    const res = await axiosClient.get("/", { params: { i: route.params.id } });

    if (res.data.Response === "True") {
      movie.value = res.data;

      historyStore.addToHistory({
        imdbID: movie.value.imdbID,
        Title: movie.value.Title,
        Year: movie.value.Year,
        Poster: movie.value.Poster,
      })
    }
  } catch (err) {
    console.error(err);
  }
});
</script>

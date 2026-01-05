<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 class="text-xl font-semibold mb-4">
      Historique des films
    </h3>

    <ul v-if="history.length" class="space-y-4">
      <li
        v-for="item in history"
        :key="item.imdbID"
        class="flex items-center gap-4 bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition"
      >
        <router-link
          :to="{ name: 'movie-details', params: { id: item.imdbID } }"
          class="flex items-center gap-4 w-full"
        >
          <img
            :src="item.Poster && item.Poster !== 'N/A' ? item.Poster : '/no-image.jpg'"
            @error="handleError"
            alt="Poster"
            class="w-14 h-20 object-cover rounded flex-shrink-0"
          />

          <div class="flex flex-col">
            <span class="font-semibold text-white">
              {{ item.Title }}
            </span>
            <span class="text-sm text-gray-300">
              {{ item.Year }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>

    <p v-else class="text-gray-400">
      Aucun film dans l’historique pour le moment.
    </p>

    <div v-if="history.length" class="mt-6 flex justify-end">
      <button
        @click="clearHistory"
        class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition font-medium"
      >
        Vider l’historique
      </button>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'

const historyStore = useHistoryStore()
const { history } = storeToRefs(historyStore)
const clearHistory = () => historyStore.clearHistory()

// Chemin de l'image de secours
const FALLBACK_URL = "/no-image.jpg";

const handleError = (e) => {
  // Empêche la boucle infinie si l'image de secours elle-même est introuvable
  if (e.target.src !== window.location.origin + FALLBACK_URL) {
    e.target.src = FALLBACK_URL;
  }
};
</script>

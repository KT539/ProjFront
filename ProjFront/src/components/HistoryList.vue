<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 class="text-xl font-semibold mb-4">
      Historique des films
    </h3>

    <!-- Liste -->
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
            :src="item.Poster"
            alt=""
            class="w-14 h-20 object-cover rounded"
          />

          <div class="flex flex-col">
            <span class="font-semibold">
              {{ item.Title }}
            </span>
            <span class="text-sm text-gray-300">
              {{ item.Year }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- Vide -->
    <p v-else class="text-gray-400">
      Aucun film dans l’historique pour le moment.
    </p>

    <!-- Bouton clear -->
    <div class="mt-6 flex justify-end">
      <button
        @click="clearHistory"
        class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
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
</script>

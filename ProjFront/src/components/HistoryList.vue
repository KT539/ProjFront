<template>
  <div class="p-4 bg-gray-100 rounded shadow">
    <h3 class="font-bold mb-2">Historique des films</h3>
    <ul>
      <li v-for="item in history" :key="item.imdbID" class="mb-2">
        <router-link :to="`/movie/${item.imdbID}`" class="flex items-center space-x-2 hover:underline">
          <img :src="item.Poster" alt="" class="w-12 h-16 object-cover"/>
          <span>{{ item.Title }} ({{ item.Year }})</span>
        </router-link>
      </li>
    </ul>
    <button @click="clearHistory" class="mt-2 px-2 py-1 bg-red-500 text-white rounded">Vider l'historique</button>
  </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
const historyStore = useHistoryStore()
const { history } = storeToRefs(historyStore)
const clearHistory = () => historyStore.clearHistory()
</script>

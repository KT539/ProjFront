<template>
  <div
    class="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
  >
    <!-- Poster -->
    <div class="aspect-[2/3] w-full bg-gray-700 overflow-hidden">
      <img
        :src="movie.Poster !== 'N/A' ? movie.Poster : fallback"
        class="w-full h-full object-cover"
        alt="Poster"
        @click="$emit('select', movie.imdbID)"
      />
    </div>

    <!-- Infos -->
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-xl font-semibold truncate">{{ movie.Title }}</h3>
      <p class="text-black text-sm">{{ movie.Year }}</p>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="genre in movie.Genre ? movie.Genre.split(', ') : []"
          :key="genre"
          class="text-black px-2 py-1 bg-gray-700 rounded text-xs"
        >
          {{ genre }}
        </span>
      </div>

      <!-- Bouton Favoris -->
      <Button :movieId="movie.imdbID" />
    </div>
  </div>
</template>

<script setup>
import Button from "./ui/Button.vue";
import { defineProps } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  fallback: {
    type: String,
    default: "https://via.placeholder.com/300x450?text=No+Image",
  },
});
</script>

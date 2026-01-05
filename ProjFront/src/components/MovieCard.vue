<template>
  <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition transform">
    <div class="aspect-[2/3] w-full bg-gray-700 overflow-hidden">
      <img
        :src="moviePoster"
        @error="handleError"
        class="w-full h-full object-cover"
        alt="Poster"
        @click="$emit('select', movie.imdbID)"
      />
    </div>

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

      <Button :movieId="movie.imdbID" />
    </div>
  </div>
</template>

<script setup>
import Button from "./ui/Button.vue";
import { defineProps, computed } from "vue";

const props = defineProps({
  movie: { type: Object, required: true }
});

const FALLBACK_PATH = "/no-image.jpg";

const moviePoster = computed(() => {
  return (props.movie.Poster && props.movie.Poster !== 'N/A')
    ? props.movie.Poster
    : FALLBACK_PATH;
});

const handleError = (e) => {
  // Vérifie si on n'est pas déjà sur l'image de secours pour éviter la boucle
  if (e.target.src !== window.location.origin + FALLBACK_PATH) {
    e.target.src = FALLBACK_PATH;
  }
};
</script>

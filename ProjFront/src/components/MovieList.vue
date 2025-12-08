<template>
  <div class="movie-list">
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :fallback="fallback"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";
import { defineProps } from "vue";

defineProps({
  movies: { type: Array, required: true },
  fallback: { type: String, default: "https://via.placeholder.com/300x450?text=No+Image" }
});
</script>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>

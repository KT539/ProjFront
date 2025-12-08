<template>


  <div class="movie-list">
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
    />
  </div>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";
import { defineProps } from "vue";

defineProps({
  movies: {
    type: Array,
    required: true,
  },
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

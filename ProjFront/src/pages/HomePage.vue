<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movie";

const movieStore = useMovieStore();
const { movie, loading, error } = storeToRefs(movieStore);

onMounted(() => {
  movieStore.fetchMovie("Avatar");
});
</script>

<template>
  <div>
    <h1>Test OMDB API</h1>

    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>

    <div v-if="movie">
      <h2>{{ movie.Title }} ({{ movie.Year }})</h2>
      <img :src="movie.Poster" alt="Poster" width="200" />
      <p><strong>Genre :</strong> {{ movie.Genre }}</p>
      <p><strong>Réalisateur :</strong> {{ movie.Director }}</p>
      <p><strong>Note IMDB :</strong> {{ movie.imdbRating }}</p>
      <p><strong>Résumé :</strong> {{ movie.Plot }}</p>
    </div>
  </div>
</template>

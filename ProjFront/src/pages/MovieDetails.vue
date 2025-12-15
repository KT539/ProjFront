<template>
  <div v-if="movie">
    <h1>{{ movie.Title }}</h1>
    <img :src="movie.Poster !== 'N/A' ? movie.Poster : fallback" alt="Poster" />
    <p><strong>Année :</strong> {{ movie.Year }}</p>
    <p><strong>Genre :</strong> {{ movie.Genre }}</p>
    <p><strong>IMDb :</strong> {{ movie.imdbRating }}</p>
    <p><strong>Synopsis :</strong> {{ movie.Plot }}</p>
  </div>
  <p v-else>Chargement...</p>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "@/api/axiosClient.js";
import {useHistoryStore} from "@/stores/history.js";

const route = useRoute();
const movie = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";
const historyStore = useHistoryStore()

const fetchMovie = async (id) => {
  movie.value = null;
  try {
    const res = await axiosClient.get("/", {
      params: { i: id }
    });
    if (res.data.Response === "True") {
      movie.value = res.data;
      historyStore.addToHistory({
        imdbID: movie.value.imdbID,
        Title: movie.value.Title,
        Year: movie.value.Year,
        Poster: movie.value.Poster,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchMovie(route.params.id);
});
watch(
  () => route.params.id,
  (newId) => {
    fetchMovie(newId);
  }
);
</script>

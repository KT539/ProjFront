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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "@/api/axiosClient.js";

const route = useRoute();
const movie = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

onMounted(async () => {
  try {
    const res = await axiosClient.get("/", { params: { i: route.params.id } });
    if (res.data.Response === "True") {
      movie.value = res.data;
    }
  } catch (err) {
    console.error(err);
  }
});
</script>

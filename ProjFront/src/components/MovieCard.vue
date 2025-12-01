<template>
  <div class="movie-card">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : fallbackImage"
      class="poster"
      alt="Poster"
    />

    <h3 class="title">{{ movie.Title }}</h3>

    <p><strong>Année :</strong> {{ movie.Year }}</p>
    <p><strong>Genre :</strong> {{ movie.Genre || 'N/A' }}</p>
    <p><strong>IMDb :</strong> {{ movie.imdbRating || 'N/A' }}</p>

    <router-link
      :to="`/movie/${movie.imdbID}`"
      class="details-link"
    >
      Voir détails →
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const fallbackImage =
  "https://via.placeholder.com/300x450?text=No+Image";
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: 0.2s;
}

.movie-card:hover {
  transform: scale(1.03);
}

.poster {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
}

.title {
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
}

.details-link {
  display: inline-block;
  margin-top: 10px;
  color: #2563eb;
  font-weight: 500;
}
</style>

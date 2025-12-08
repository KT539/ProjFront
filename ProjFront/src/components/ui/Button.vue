<template>
  <button @click="handleClick">
    {{ isFavorite ? "Retirer des favoris" : "Ajouter aux favoris" }}
  </button>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getFavorites, toggleFavorite } from '../../utils/favorites.js'

const props = defineProps({
  movieId: Number
})

const isFavorite = ref(getFavorites().includes(props.movieId))

function handleClick() {
  toggleFavorite(props.movieId)
  isFavorite.value = !isFavorite.value
}
</script>

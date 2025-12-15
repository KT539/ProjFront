<template>
  <BaseButton
    :variant="isFavorite ? 'danger' : 'primary'"
    @click="toggle"
  >
    {{ isFavorite ? "Retirer des favoris" : "Ajouter aux favoris" }}
  </BaseButton>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "./BaseButton.vue";
import { getFavorites, toggleFavorite } from "../../utils/favorites.js";

const props = defineProps({
  movieId: [String, Number],
});

const isFavorite = ref(getFavorites().includes(props.movieId));

const toggle = () => {
  toggleFavorite(props.movieId);
  isFavorite.value = !isFavorite.value;
};
</script>

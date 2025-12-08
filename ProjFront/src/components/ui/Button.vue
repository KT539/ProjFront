<template>
  <button
    class="px-4 py-2 rounded-lg shadow w-max transition"
    :class="isFavorite ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- Slot par défaut, texte dynamique si rien n'est passé -->
    <slot>
      {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
    </slot>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { getFavorites, toggleFavorite } from '../../utils/favorites.js'

const props = defineProps({
  movieId: {
    type: [String, Number],
    required: true
  }
})

const isFavorite = ref(getFavorites().includes(props.movieId))

function handleClick() {
  toggleFavorite(props.movieId)
  isFavorite.value = !isFavorite.value
}
</script>


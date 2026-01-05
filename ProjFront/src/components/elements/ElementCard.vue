<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition transform hover:-translate-y-1 cursor-pointer"
  >
    <img
      :src="element.Poster"
      @error="handleError"
      class="w-full h-64 object-cover"
      alt="Poster"
    />

    <div class="p-4 space-y-1">
      <h3 class="text-lg font-bold text-gray-800 truncate">
        {{ element.Title }}
      </h3>

      <p class="text-gray-600 text-sm">{{ element.Year }}</p>

      <span
        class="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wide"
      >
        {{ element.Type }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, computed } from "vue";

  defineProps(["element"]);

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

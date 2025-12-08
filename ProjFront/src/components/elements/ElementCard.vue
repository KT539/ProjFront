<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition transform hover:-translate-y-1 cursor-pointer"
  >
    <img
      :src="element.Poster !== 'N/A' ? element.Poster : placeholder"
      class="w-full h-64 object-cover"
      alt="Movie Poster"
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
import placeholder from "@/assets/no-poster.png";
defineProps(["element"]);
</script>

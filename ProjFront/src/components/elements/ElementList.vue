<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <ElementCard
      v-for="item in elements"
      :key="item.imdbID"
      :element="item"
    />
  </div>
</template>

<script setup>
import ElementCard from "./ElementCard.vue";
defineProps(["elements"]);
</script>

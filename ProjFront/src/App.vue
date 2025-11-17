<script setup>
import { ref, onMounted } from "vue";
import { searchMovies } from "./api/movies.js";
import TestTailwind from './components/Tailwind.vue';

const results = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await searchMovies({ title: "Avatar" });
    results.value = data;
    console.log("Search results:", data); // <--- ADD THIS
  } catch (err) {
    error.value = err;
    console.error("Failed to fetch:", err);
  }
});
</script>

<template>
  <h1>Test Backend</h1>
  <div v-if="error">Error: {{ error.message }}</div>
  <pre>{{ results }}</pre>
  <div>
    <TestTailwind />
  </div>
</template>

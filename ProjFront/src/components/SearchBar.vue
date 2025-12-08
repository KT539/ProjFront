<script setup>
import { ref, defineEmits } from "vue";

const searchInput = ref("");
const emit = defineEmits(["search"]);

const handleSearch = () => {
  emit("search", searchInput.value);
};
</script>

<template>
  <div class="flex mb-4 gap-2 items-stretch">

    <!-- search field -->
    <input
      v-model="searchInput"
      type="text"
      placeholder="Rechercher un film..."
      class="border p-2 flex-1 rounded"
    />

    <!-- search button -->
    <button
      @click="handleSearch"
      class="bg-blue-600 text-white px-5 rounded flex items-center justify-center"
    >
      Rechercher
    </button>

    <!-- button to history page -->
    <router-link
      to="/history"
      class="bg-gray-800 text-white px-5 rounded flex items-center justify-center hover:bg-gray-700 transition"
      title="Voir l’historique"
    >
      Historique
    </router-link>

  </div>
</template>

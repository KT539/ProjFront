<script setup>
import { ref, defineEmits } from "vue";

const searchInput = ref("");
const emit = defineEmits(["search"]);

const handleSearch = () => {
  emit("search", searchInput.value);
};
</script>

<template>
  <div class="flex mb-4">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Rechercher un film..."
      class="border p-2 flex-1 rounded-l"
    />
    <button
      @click="handleSearch"
      class="bg-blue-600 text-white px-4 rounded-r"
    >
      Rechercher
    </button>
  </div>
</template>

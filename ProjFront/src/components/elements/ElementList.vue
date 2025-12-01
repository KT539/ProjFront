<script setup>
import { onMounted } from "vue"
import { useElementsStore } from "@/stores/elements"

const store = useElementsStore()

onMounted(() => {
  store.fetchElements()
})
</script>

<template>
  <div>
    <h2>Liste des éléments</h2>

    <div v-if="store.loading">Chargement...</div>
    <div v-if="store.error">{{ store.error }}</div>

    <ElementCard
      v-for="el in store.items"
      :key="el.id"
      :element="el"
    />
  </div>
</template>

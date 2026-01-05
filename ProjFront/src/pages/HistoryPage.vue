<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <AppHeader />
    <header class="mb-8">
      <h1 class="text-3xl font-bold">🕒 Historique</h1>
      <p class="text-gray-400 mt-1">
        Films consultés récemment
      </p>
    </header>

    <HistoryList />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layouts/AppHeader.vue";
import HistoryList from "@/components/HistoryList.vue";
</script>

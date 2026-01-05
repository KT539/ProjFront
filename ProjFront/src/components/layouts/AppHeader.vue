<template>
  <header class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold">
      🎬 Movies App
    </h1>

    <nav class="flex gap-3">
      <BaseButton v-if="route.path !== '/'" @click="goHome">
        Accueil
      </BaseButton>

      <BaseButton variant="warning" @click="goFavorites">
        Favoris
      </BaseButton>

      <BaseButton
        v-if="route.path !== '/history'"
        variant="primary"
        @click="goHistory"
      >
        Historique
      </BaseButton>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"; // Import de useRoute
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();
const route = useRoute(); // Initialisation de la route

const goHome = () => router.push("/");
const goFavorites = () => router.push("/favorites");
const goHistory = () => router.push("/history");
</script>

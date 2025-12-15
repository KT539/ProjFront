<template>
  <header class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-bold">
      🎬 Movies App
    </h1>

    <nav class="flex gap-3">
      <BaseButton @click="goHome">
        Accueil
      </BaseButton>

      <BaseButton variant="warning" @click="goFavorites">
        Favoris
      </BaseButton>

      <BaseButton variant="primary" @click="goHistory">
        Historique
      </BaseButton>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();

const goHome = () => router.push("/");
const goFavorites = () => router.push("/favorites");
const goHistory = () => router.push("/history");
</script>


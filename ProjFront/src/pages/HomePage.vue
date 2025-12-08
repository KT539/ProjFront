<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Films</h1>

    <!-- Barre de recherche -->
    <SearchBar @search="handleSearch" />

    <!-- Bouton filtres -->
    <div class="flex justify-end my-3">
      <Button @click="showFilters = !showFilters">
        {{ showFilters ? "Fermer les filtres" : "Filtres" }}
      </Button>
    </div>

    <!-- Panneau de filtres -->
    <ElementFilters
      v-if="showFilters"
      @filter="applyFilters"
    />

    <div v-if="loading" class="text-gray-500 mb-3">
      Chargement...
    </div>

    <div v-if="error" class="text-red-500 my-3">
      Erreur : {{ error }}
    </div>

    <!-- Liste filtrée -->
    <MovieList :movies="filteredMovies" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axiosClient from "../api/axiosClient.js";

import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import ElementFilters from "../components/elements/ElementFilters.vue";
import Button from "../components/ui/Button.vue";

import { featuredMovies, searchMovies } from "../api/movies.js";

const movies = ref([]);
const loading = ref(false);
const error = ref(null);

const showFilters = ref(false);

// Filtres appliqués
const filters = ref({
  title: "",
  year: "",
  genre: "",
  minRating: "",
});

/* -----------------------------
   FILTRAGE LOCAL (FULL)
----------------------------- */
const filteredMovies = computed(() => {
  return movies.value.filter((m) => {
    const okTitle =
      !filters.value.title ||
      m.Title?.toLowerCase().includes(filters.value.title.toLowerCase());

    const okYear =
      !filters.value.year ||
      m.Year?.includes(filters.value.year);

    const okGenre =
      !filters.value.genre ||
      m.Genre?.toLowerCase().includes(filters.value.genre.toLowerCase());

    const okRating =
      !filters.value.minRating ||
      parseFloat(m.imdbRating) >= parseFloat(filters.value.minRating);

    return okTitle && okYear && okGenre && okRating;
  });
});

/* -----------------------------
   APPLIQUER LES FILTRES
----------------------------- */
const applyFilters = (f) => {
  filters.value = f;
};

/* -----------------------------
   CHARGER LES FILMS FEATURED
----------------------------- */
const loadFeatured = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Films à la une déjà complets
    movies.value = await featuredMovies();
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors du chargement des films à la une";
  } finally {
    loading.value = false;
  }
};

/* -----------------------------
   RECHERCHE AVEC DETAILS
----------------------------- */
const handleSearch = async (query) => {
  if (!query) {
    await loadFeatured();
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    // 1️⃣ Recherche basique (titre seulement)
    const results = await searchMovies(query);

    if (!Array.isArray(results)) {
      movies.value = [];
      return;
    }

    // 2️⃣ Récupération des détails COMPLETS pour chaque film
    const detailed = await Promise.all(
      results.map(async (item) => {
        const res = await axiosClient.get("/", {
          params: { i: item.imdbID },
        });
        return res.data.Response === "True" ? res.data : null;
      })
    );

    movies.value = detailed.filter(Boolean);
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors de la recherche";
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadFeatured();
});
</script>

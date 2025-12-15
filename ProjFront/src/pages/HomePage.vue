<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">🎬 Films</h1>

      <button
        @click="router.push('/favorites')"
        class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition"
      >
        Mes Favoris
      </button>
    </header>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Bouton filtres -->
    <div class="flex justify-end my-3">
      <BaseButton @click="showFilters = !showFilters">
        {{ showFilters ? "Fermer les filtres" : "Filtres" }}
      </BaseButton>
    </div>

    <!-- Panneau de filtres -->
    <ElementFilters
      v-if="showFilters"
      @filter="applyFilters"
    />

    <!-- Messages -->
    <div v-if="loading" class="text-gray-400 mb-3 text-center">
      Chargement...
    </div>

    <div v-if="error" class="text-red-500 my-3 text-center">
      Erreur : {{ error }}
    </div>

    <!-- Liste des films -->
    <MovieList
      :movies="filteredMovies"
      :fallback="fallback"
      @select="goToDetails"
    />

    <!-- Aucun film -->
    <div v-if="filteredMovies.length === 0 && !loading" class="text-center text-gray-400 mt-12 text-xl">
      Aucun film trouvé pour le moment.
    </div>
</div>

</template>

<script setup>
import { ref, onMounted, computed} from "vue";
import axiosClient from "../api/axiosClient.js";
import { useRouter } from "vue-router";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import ElementFilters from "../components/elements/ElementFilters.vue";
import BaseButton from "../components/ui/BaseButton.vue";

import { featuredMovies, searchMovies } from "../api/movies.js";

const router = useRouter();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

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
  filters.value = { ...filters.value, ...f };
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

const goToDetails = (id) => {
  router.push({ name: "movie-details", params: { id } });
};

onMounted(async () => {
  await loadFeatured();
});
</script>

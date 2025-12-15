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

    <!-- Bouton filtres et choix items per page -->
    <div class="flex justify-between items-center my-3">
      <BaseButton @click="showFilters = !showFilters">
        {{ showFilters ? "Fermer les filtres" : "Filtres" }}
      </BaseButton>

      <div class="flex items-center gap-2">
        <label>Films par page :</label>
        <select v-model.number="itemsPerPage" class="bg-gray-800 text-white p-1 rounded">
          <option :value="15">15</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Panneau de filtres -->
    <ElementFilters
      v-if="showFilters"
      @filter="applyFilters"
    />

    <!-- Messages -->
    <div v-if="loading" class="text-gray-400 mb-3 text-center">Chargement...</div>
    <div v-if="error" class="text-red-500 my-3 text-center">Erreur : {{ error }}</div>

    <div v-if="error" class="text-red-500 my-3 text-center">
      Erreur : {{ error }}
    </div>

    <!-- Tri des films -->
    <div class="flex justify-end mb-4">
      <select
        v-model="sortOption"
        class="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700"
      >
        <option value="title-asc">Titre (A → Z)</option>
        <option value="title-desc">Titre (Z → A)</option>
        <option value="year-asc">Année (croissante)</option>
        <option value="year-desc">Année (décroissante)</option>
      </select>
    </div>

    <!-- Liste des films -->
    <MovieList
      :movies="paginatedMovies"
      :fallback="fallback"
      @select="goToDetails"
    />

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>

    <!-- Aucun film -->
    <div v-if="filteredMovies.length === 0 && !loading" class="text-center text-gray-400 mt-12 text-xl">
      Aucun film trouvé pour le moment.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import ElementFilters from "../components/elements/ElementFilters.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import { featuredMovies } from "../api/movies.js"; // fetch initial movies
import { searchMovies } from "../api/movies.js";
import axiosClient from "../api/axiosClient.js";

const router = useRouter();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

const showFilters = ref(false);
const sortOption = ref("title-asc");
const getYear = (y) => parseInt(y?.slice(0, 4)) || 0;


// Pagination
const itemsPerPage = ref(15);
const currentPage = ref(1);

// Filtres appliqués
const filters = ref({
  title: "",
  year: "",
  genre: "",
  minRating: "",
});

/* -----------------------------
   FILTRAGE LOCAL
----------------------------- */
const filteredMovies = computed(() => {
  return movies.value.filter((m) => {
    const okTitle = !filters.value.title || m.Title?.toLowerCase().includes(filters.value.title.toLowerCase());
    const okYear = !filters.value.year || m.Year?.includes(filters.value.year);
    const okGenre = !filters.value.genre || m.Genre?.toLowerCase().includes(filters.value.genre.toLowerCase());
    const okRating = !filters.value.minRating || parseFloat(m.imdbRating) >= parseFloat(filters.value.minRating);
    return okTitle && okYear && okGenre && okRating;
  });
});

/* -----------------------------
   FILMS PAGINÉS
----------------------------- */
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedMovies.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / itemsPerPage.value));
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// Reset page à 1 si filtres ou itemsPerPage changent
watch([filters, itemsPerPage], () => { currentPage.value = 1; });

/* -----------------------------
   APPLIQUER LES FILTRES
----------------------------- */
const applyFilters = (f) => { filters.value = { ...filters.value, ...f }; };

/* -----------------------------
   TRIER LES RÉSULTATS
----------------------------- */

const sortedMovies = computed(() => {
  const list = [...filteredMovies.value];

  switch (sortOption.value) {
    case "title-asc":
      return list.sort((a, b) =>
        (a.Title || "").localeCompare(b.Title || "")
      );

    case "title-desc":
      return list.sort((a, b) =>
        (b.Title || "").localeCompare(a.Title || "")
      );

    case "year-asc":
      return list.sort((a, b) =>
        getYear(a.Year) - getYear(b.Year)
      );

    case "year-desc":
      return list.sort((a, b) =>
        getYear(b.Year) - getYear(a.Year)
      );

    default:
      return list;
  }
});


/* -----------------------------
   RECHERCHE
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
   CHARGER FILMS FEATURED
----------------------------- */
const handleSearch = async (query) => {
  if (!query) {
    await loadFeatured();
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    const results = await searchMovies(query); // récupère plusieurs pages et filtre
    movies.value = results;
    currentPage.value = 1;
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors de la recherche";
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

/* -----------------------------
   NAVIGATION VERS DETAILS
----------------------------- */
const goToDetails = (id) => {
  router.push({ name: "movie-details", params: { id } });
};

onMounted(async () => {
  await loadFeatured();
});
</script>

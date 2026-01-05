<template>
  <div
    :class="[
      'min-h-screen p-6 transition-colors duration-300',
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    ]"
  >
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">🎬 Films</h1>
      <div class="flex gap-2">
        <!-- Toggle Mode -->
        <button
          @click="darkMode = !darkMode"
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          {{ darkMode ? 'Mode Clair' : 'Mode Sombre' }}
        </button>

        <!-- Favoris -->
        <button
          @click="router.push('/favorites')"
          class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Mes Favoris
        </button>
      </div>
    </header>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Filtres & items per page -->
    <div class="flex justify-between items-center my-3">
      <BaseButton @click="showFilters = !showFilters">
        {{ showFilters ? "Fermer les filtres" : "Filtres" }}
      </BaseButton>

      <div class="flex items-center gap-2">
        <label>Films par page :</label>
        <select
          v-model.number="itemsPerPage"
          :class="darkMode ? 'bg-gray-800 text-white p-1 rounded' : 'bg-gray-200 text-gray-900 p-1 rounded'"
        >
          <option :value="15">15</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Panneau de filtres -->
    <ElementFilters v-if="showFilters" @filter="applyFilters" />

    <!-- Messages -->
    <div v-if="loading" :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="mb-3 text-center">
      Chargement...
    </div>
    <div v-if="error" class="text-red-500 my-3 text-center">
      Erreur : {{ error }}
    </div>

    <!-- Liste des films paginée -->
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
        :class="[
          'px-3 py-1 rounded disabled:opacity-50',
          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'
        ]"
      >
        Précédent
      </button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        :class="[
          'px-3 py-1 rounded disabled:opacity-50',
          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'
        ]"
      >
        Suivant
      </button>
    </div>

    <!-- Aucun film -->
    <div v-if="filteredMovies.length === 0 && !loading"
         :class="darkMode ? 'text-gray-400' : 'text-gray-500'"
         class="text-center mt-12 text-xl">
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
import { featuredMovies, searchMovies } from "../api/movies.js";

const router = useRouter();
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const fallback = "https://via.placeholder.com/300x450?text=No+Image";

const showFilters = ref(false);
const darkMode = ref(true);

// Charger le mode depuis localStorage
onMounted(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) darkMode.value = saved === 'true';
  loadFeatured();
});

// Sauvegarder le choix à chaque changement
watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val);
});

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

// Filtrage local
const filteredMovies = computed(() => {
  return movies.value.filter((m) => {
    const okTitle = !filters.value.title || m.Title?.toLowerCase().includes(filters.value.title.toLowerCase());
    const okYear = !filters.value.year || m.Year?.includes(filters.value.year);
    const okGenre = !filters.value.genre || m.Genre?.toLowerCase().includes(filters.value.genre.toLowerCase());
    const okRating = !filters.value.minRating || parseFloat(m.imdbRating) >= parseFloat(filters.value.minRating);
    return okTitle && okYear && okGenre && okRating;
  });
});

// Films paginés
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredMovies.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / itemsPerPage.value));
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// Reset page si filtres/itemsPerPage changent
watch([filters, itemsPerPage], () => { currentPage.value = 1; });

// Appliquer les filtres
const applyFilters = (f) => { filters.value = { ...filters.value, ...f }; };

// Recherche
const handleSearch = async (query) => {
  if (!query) {
    await loadFeatured();
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const results = await searchMovies(query);
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

// Charger films featured
const loadFeatured = async () => {
  loading.value = true;
  error.value = null;
  try {
    movies.value = await featuredMovies();
  } catch (err) {
    console.error(err);
    error.value = "Erreur lors du chargement des films à la une";
  } finally {
    loading.value = false;
  }
};

// Navigation vers détails
const goToDetails = (id) => {
  router.push({ name: "movie-details", params: { id } });
};
</script>

<template>
  <div
    :class="[
      'min-h-screen p-6 transition-colors duration-300',
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    ]"
  >
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">🎬 Films</h1>
      <div class="flex gap-2">
        <button
          @click="darkMode = !darkMode"
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          {{ darkMode ? 'Mode Clair' : 'Mode Sombre' }}
        </button>

        <button
          @click="router.push('/favorites')"
          class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Mes Favoris
        </button>
      </div>
    </header>

    <div class="mb-6">
      <SearchBar @search="handleSearch" />
    </div>

    <div class="flex justify-between items-center my-3">
      <BaseButton @click="showFilters = !showFilters">
        {{ showFilters ? "Fermer les filtres" : "Filtres" }}
      </BaseButton>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label>Trier par :</label>
          <select
            v-model="sortOption"
            :class="darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-200 text-gray-900 border-gray-300'"
            class="px-3 py-1 rounded border"
          >
            <option value="title-asc">Titre (A → Z)</option>
            <option value="title-desc">Titre (Z → A)</option>
            <option value="year-asc">Année (croissante)</option>
            <option value="year-desc">Année (décroissante)</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <label>Par page :</label>
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
    </div>

    <ElementFilters v-if="showFilters" @filter="applyFilters" />

    <div v-if="loading" :class="darkMode ? 'text-gray-400' : 'text-gray-500'" class="mb-3 text-center">
      Chargement...
    </div>
    <div v-if="error" class="text-red-500 my-3 text-center">
      Erreur : {{ error }}
    </div>

    <MovieList
      :movies="paginatedMovies"
      :fallback="fallback"
      @select="goToDetails"
    />

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
      <span class="flex items-center">Page {{ currentPage }} / {{ totalPages }}</span>
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
const fallback = "/no-image.jpg"; // Utilisation de ton fallback local

const showFilters = ref(false);
const darkMode = ref(true);
const sortOption = ref("title-asc");

// 1. Initialisation
onMounted(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) darkMode.value = saved === 'true';
  loadFeatured();
});

watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val);
});

// 2. Pagination State
const itemsPerPage = ref(15);
const currentPage = ref(1);

// 3. Filtres State
const filters = ref({
  title: "",
  year: "",
  genre: "",
  minRating: "",
});

/* -----------------------------
   LOGIQUE DE TRAITEMENT DES DONNÉES
----------------------------- */

// A. Étape 1 : Filtrage
const filteredMovies = computed(() => {
  return movies.value.filter((m) => {
    const okTitle = !filters.value.title || m.Title?.toLowerCase().includes(filters.value.title.toLowerCase());
    const okYear = !filters.value.year || m.Year?.includes(filters.value.year);
    const okGenre = !filters.value.genre || m.Genre?.toLowerCase().includes(filters.value.genre.toLowerCase());
    const okRating = !filters.value.minRating || parseFloat(m.imdbRating) >= parseFloat(filters.value.minRating);
    return okTitle && okYear && okGenre && okRating;
  });
});

// B. Étape 2 : Tri (Récupéré de develop)
const getYear = (y) => parseInt(y?.slice(0, 4)) || 0;

const sortedMovies = computed(() => {
  const list = [...filteredMovies.value];
  switch (sortOption.value) {
    case "title-asc":
      return list.sort((a, b) => (a.Title || "").localeCompare(b.Title || ""));
    case "title-desc":
      return list.sort((a, b) => (b.Title || "").localeCompare(a.Title || ""));
    case "year-asc":
      return list.sort((a, b) => getYear(a.Year) - getYear(b.Year));
    case "year-desc":
      return list.sort((a, b) => getYear(b.Year) - getYear(a.Year));
    default:
      return list;
  }
});

// C. Étape 3 : Pagination (S'applique sur les films triés)
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sortedMovies.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / itemsPerPage.value));

/* -----------------------------
   ACTIONS & WATCHERS
----------------------------- */

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// Reset page si filtres/tri/items change
watch([filters, itemsPerPage, sortOption], () => {
  currentPage.value = 1;
});

const applyFilters = (f) => { filters.value = { ...filters.value, ...f }; };

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
    error.value = "Erreur lors de la recherche";
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

const loadFeatured = async () => {
  loading.value = true;
  error.value = null;
  try {
    movies.value = await featuredMovies();
  } catch (err) {
    error.value = "Erreur lors du chargement des films à la une";
  } finally {
    loading.value = false;
  }
};

const goToDetails = (id) => {
  router.push({ name: "movie-details", params: { id } });
};
</script>

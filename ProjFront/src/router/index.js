import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import MovieDetails from "../pages/MovieDetails.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/movie/:id", name: "movie-details", component: MovieDetails },
  { path: "/favorites", name: "favorites", component: FavoritesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

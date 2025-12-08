import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import MovieDetails from "../pages/MovieDetails.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/movie/:id", name: "movie-details", component: MovieDetails },
  { path: "/history", name: "history", component: () => import("@/pages/HistoryPage.vue")}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

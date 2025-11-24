import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ElementDetailPage from "../pages/ElementDetailPage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/movie/:id",
    name: "movie-detail",
    component: ElementDetailPage,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesPage,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

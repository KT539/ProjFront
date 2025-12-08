// src/utils/favorites.js

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function addFavorite(movieId) {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(movieId) {
  const favorites = getFavorites().filter(id => id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function toggleFavorite(movieId) {
  const favorites = getFavorites();
  if (favorites.includes(movieId)) {
    removeFavorite(movieId);
  } else {
    addFavorite(movieId);
  }
}

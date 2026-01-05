// src/stores/themeStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const themeStore = defineStore('theme', () => {
  const darkMode = ref(true)

  // Charger depuis localStorage
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) darkMode.value = saved === 'true'

  // Sauvegarder à chaque changement
  watch(darkMode, (val) => localStorage.setItem('darkMode', val))

  const toggle = () => { darkMode.value = !darkMode.value }

  return { darkMode, toggle }
})

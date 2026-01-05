import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: JSON.parse(localStorage.getItem('movieHistory') || '[]')
  }),
  actions: {
    addToHistory(movie) {
      const exists = this.history.find(item => item.imdbID === movie.imdbID)
      if (!exists) {
        this.history.unshift(movie)
        if (this.history.length > 20) this.history.pop()
        localStorage.setItem('movieHistory', JSON.stringify(this.history))
      }
    },
    clearHistory() {
      this.history = []
      localStorage.removeItem('movieHistory')
    }
  }
})

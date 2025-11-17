import defineStore from "pinia";
import elementApi from "../api/elementApi";

export const useElementsStore = defineStore("elements", {
  state: () => ({
    items: [],
    laoding: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;

      try {
        const reponse = await elementApi.getAll();
        this.items = reponse.data;
      } catch (error) {
        this.error = error.message;
      }finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;

      try {
        const reponse = await elementApi.getById(id);
        this.items = reponse.data;
      } catch (error) {
        this.error = error.message;
      }finally {
        this.loading = false;
      }
    }
  }
});

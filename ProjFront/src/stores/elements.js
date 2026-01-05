import defineStore from "pinia";
import elementApi, {getElementById, getElements} from "../api/elementApi";
import axios from "axios";

export const useElementsStore = defineStore("elements", {
  state: () => ({
    items: [],
    selected: null,
    laoding: false,
    error: null,
  }),

  actions: {
    async fetchElements() {
      this.loading = true;
      try {
        const response = await getElements()
        this.items = response.data
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchElementDetail(id) {
    this.loading = true;
    try {
      const response = await getElementById(id)
      this.selected = response.data
    } catch(err) {
      this.error = err.message;
    }finally {
      this.loading = false;
    }
    }
  }
  })


import axiosClient from "./axiosClient";

export default {
  getAll() {
    return axiosClient.get("/elements");
  },

  getById(id) {
    return axiosClient.get(`/elements/${id}`);
  },

  search(query) {
    return axiosClient.get(`/elements`, {
      params: {q: query},
    });
  }
};

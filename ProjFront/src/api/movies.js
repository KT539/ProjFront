import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/movies"
});

export function getMovieById(id) {
  return api.get(`/${id}`).then(res => res.data);
}

export function searchMovies(params) {
  return api.get("/search", { params }).then(res => res.data);
}

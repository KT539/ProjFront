import { getMovieById, searchMovies } from "../models/movieModel.js";


export const listMovies = async (req, res) => {
  return res.status(400).json({
    error: "Direct OMDb API does not support listing all movies",
  });
};


export const getOneMovie = async (req, res) => {
  const movie = await getMovieById(req.params.id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
};


export const search = async (req, res) => {
  const { title, year, genre } = req.query;
  const results = await searchMovies({ title, year, genre });
  res.json(results);
};

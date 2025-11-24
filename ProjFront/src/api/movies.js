import axios from "axios";

export async function searchMovies(title, year = "", genre = "") {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies/search`, {
      params: {
        title,
        year,
        genre,
        apiKey: import.meta.env.VITE_API_KEY
      }
    });
    return res.data; // attendu : tableau de films
  } catch (err) {
    console.error("Erreur fetch API:", err);
    throw err;
  }
}

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";


export const getMovieById = async (id) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: id },
    });


    if (res.data.Response === "False") return null;
    return res.data;
  } catch (err) {
    console.error("Error fetching movie by ID:", err.message);
    return null;
  }
};


export const searchMovies = async ({ title, year, genre }) => {
  if (!title) return [];


  try {
    const res = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: title },
    });


    if (!res.data.Search) return [];


    let results = res.data.Search;


    if (year) results = results.filter((m) => m.Year === year);


    if (genre) {
      const detailed = await Promise.all(
        results.map(async (m) => await getMovieById(m.imdbID))
      );


      results = detailed.filter((m) =>
        m?.Genre?.toLowerCase().includes(genre.toLowerCase())
      );
    }


    return results;
  } catch (err) {
    console.error("Error searching movies:", err.message);
    return [];
  }
};

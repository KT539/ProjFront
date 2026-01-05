import omdbClient from "./omdbClients.js";

export const getMovieByTitle = (title) => {
  return omdbClient.get("/", {
    params: { t: title } // t = titre du film
  });
};

export const getMovieById = (id) => {
  return omdbClient.get("/", {
    params: { i: id }
  });
};

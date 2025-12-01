import omdbClient from "./omdbClients.js";

export const getMovieByTitle = (title) => {
  return omdbClient.get("/", {
    params: { t: title } // t = titre du film
  });
};

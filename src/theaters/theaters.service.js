const knex = require("../db/connection");

// SERVICE FUNCTIONS //

function list() {
  return knex("theaters").select("*");
}

function listMovies(theaterId) {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ theater_id: theaterId })
    .select("movies.*");
}

function listTheaters(movieId) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .where({ movie_id: movieId })
    .select("theaters.*");
}

// EXPORT //

module.exports = {
  list,
  listMovies,
  listTheaters,
};

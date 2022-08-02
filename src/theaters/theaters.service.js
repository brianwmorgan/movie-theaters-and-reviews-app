const knex = require("../db/connection");

// SERVICE FUNCTIONS //

function listTheaters() {
  return knex("theaters").select("*");
}

function listMoviesAtEachTheater(theaterId) {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ theater_id: theaterId })
    .select("movies.*");
}

// EXPORT //

module.exports = {
  listTheaters,
  listMoviesAtEachTheater,
};

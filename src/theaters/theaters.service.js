const knex = require("../db/connection");

function listTheaters() {
  return knex("theaters").select("*");
};

function listMoviesAtEachTheater(theaterId) {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "theater_id": theaterId })
    .select("movies.*");
};

module.exports = {
  listTheaters,
  listMoviesAtEachTheater,
};

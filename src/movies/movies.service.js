const knex = require("../db/connection");

function list(isShowing) {
  if (isShowing) {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .distinct()
      .select("movies.*")
      .where({ is_showing: true });
  }
  return knex("movies").select("*");
};

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
};

module.exports = {
  list,
  read,
};

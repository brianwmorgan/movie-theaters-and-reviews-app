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

module.exports = {
  list,
};

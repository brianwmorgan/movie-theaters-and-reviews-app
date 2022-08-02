const knex = require("../db/connection");

// SERVICE FUNCTIONS //

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function getReviewsForMovie(movieId) {
  return knex("reviews").select("*").where({ movie_id: movieId });
}

// EXPORT //

module.exports = {
  read,
  update,
  destroy,
  getCritic,
  getReviewsForMovie,
};

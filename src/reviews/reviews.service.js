const knex = require("../db/connection");

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

// function update(updatedReview, id) {
//   return knex("reviews")
//     .select("*")
//     .where({ review_id: id })
//     .update({ ...updatedReview });
// }

function update(review) {
  return knex("reviews")
    .select("*")
    .where({ review_id: review.review_id })
    .update(review);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  getCritic,
  read,
  update,
  destroy,
};

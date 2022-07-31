const knex = require("../db/connection");

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update() {}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  getCritic,
  read,
  update,
  destroy,
};

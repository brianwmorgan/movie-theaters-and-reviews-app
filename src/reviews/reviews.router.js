const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").get(controller.readReviewsForMovie).all(methodNotAllowed);

module.exports = router;

const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// MIDDLEWARE VALIDATORS //

async function validateReviewId(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: "Review cannot be found.",
  });
}

// REFACTOR?
function validateReviewUpdateFields(req, res, next) {
  const { data: { score = null, content = null } = {} } = req.body;
  const updatedReview = {};
  if (!score && !content) {
    return next({
      status: 400,
      message: "Updated review is missing a score and/or content.",
    });
  }
  if (score) {
    updatedReview.score = score;
  }
  if (content) {
    updatedReview.content = content;
  }
  res.locals.update = updatedReview;
  next();
}

// HTTP METHODS //

async function update(req, res, next) {}

async function destroy(req, res, next) {
  try {
    const { review } = res.locals;
    await reviewsService.destroy(review.review_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

// EXPORT //

module.exports = {
  update: [
    asyncErrorBoundary(validateReviewId),
    validateReviewUpdateFields,
    // asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(validateReviewId), destroy],
};

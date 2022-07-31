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

// REFACTOR FOR TRY/CATCH
// async function update(req, res) {
//   const { review } = res.locals;
//   const { update } = res.locals;
//   await service.update(update, review.review_id);
//   const updatedReview = await service.read(review.review_id);
//   const critic = await service.getCritic(review.critic_id);

//   res.status(200).json({ data: { ...updatedReview, critic: critic[0] } });
// }

async function update(req, res) {
	const newReview = {
		...req.body.data,
		review_id: res.locals.review.review_id,
	}

	await service.update(newReview);
	const review = await service.read(res.locals.review.review_id);

	const reviewToReturn = {
		...review,
		critic: await service.readCritic(res.locals.review.critic_id),
	}

	res.json({ data: reviewToReturn });
}

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
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(validateReviewId), destroy],
};

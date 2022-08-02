const reviewsService = require("./reviews.service");

// MIDDLEWARE VALIDATORS //

async function validateReviewId(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

// REFACTOR?
function validateReviewUpdateFields(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

// HTTP METHODS //

async function update(req, res, next) {
  try {
    const newReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const updatedReview = await reviewsService.update(newReview);
    const review = await reviewsService.read(res.locals.review.review_id);
    const reviewToReturn = {
      ...review,
      critic: await reviewsService.getCritic(res.locals.review.critic_id),
    };
    res.json({ data: reviewToReturn });
  } catch (error) {
    next(error);
  }
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

async function readReviewsForMovie(req, res, next) {
  try {
    const reviews = await reviewsService.getReviewsForMovie(
      res.locals.movie.movie_id
    );

    for (let review of reviews) {
      const critic = await reviewsService.getCritic(review.critic_id);

      review["critic"] = critic;
    }

    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
}

// EXPORT //

module.exports = {
  update: [validateReviewId, validateReviewUpdateFields, update],
  delete: [validateReviewId, destroy],
  readReviewsForMovie,
};

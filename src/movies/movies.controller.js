const moviesService = require("./movies.service");

// MIDDLEWARE VALIDATORS //

async function validateMovieId(req, res, next) {
  try {
    const { movieId } = req.params;
    const movie = await moviesService.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({
      status: 404,
      message: "Movie cannot be found.",
    });
  } catch (error) {
    next(error);
  }
}

// HTTP METHODS //

async function list(req, res, next) {
  try {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const { movieId } = req.params;
    const data = await moviesService.read(movieId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

// EXPORT //

module.exports = {
  list,
  read: [validateMovieId, read],
  validateMovieId,
};

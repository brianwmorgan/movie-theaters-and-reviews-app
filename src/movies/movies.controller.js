const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//  *** refactor to use try/catch ??? ***
async function validateMovieId(req, res, next) {
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
}

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

module.exports = {
  list,
  read: [asyncErrorBoundary(validateMovieId), read],
};

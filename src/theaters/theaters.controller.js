const theatersService = require("./theaters.service");

// HTTP METHODS //

async function list(req, res, next) {
  const { movieId } = req.params;
  try {
    const theaters = await theatersService.list();
    for (let theater of theaters) {
      const movies = await theatersService.listMovies(theater.theater_id);
      theater["movies"] = movies;
    }
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

async function listTheatersShowingMovie(req, res, next) {
  try {
    if (res.locals.movie) {
      return res.json({
        data: await theatersService.listTheaters(res.locals.movie.movie_id),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

// EXPORT ///

module.exports = {
  list: [listTheatersShowingMovie, list],
};

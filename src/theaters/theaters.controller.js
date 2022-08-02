const theatersService = require("./theaters.service");

// HTTP METHODS //

async function list(req, res, next) {
  const { movieId } = req.params;
  try {
    const theaters = await theatersService.listTheaters();
    for (let theater of theaters) {
      const movies = await theatersService.listMoviesAtEachTheater(
        theater.theater_id,
        movieId
      );
      theater["movies"] = movies;
    }
    console.log(req.params);
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

// EXPORT ///

module.exports = {
  list,
};

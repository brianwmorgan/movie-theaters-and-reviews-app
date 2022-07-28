const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validateMovieId(req, res, next) {
    const { movieId } = req.params;
    const movie = await moviesService.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    };
    next({
        status: 404,
        message: "Movie cannot be found.",
    });
};

async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
};

async function read(req, res, next) {
    const { movieId } = req.params;
    const data = await moviesService.read(movieId);
    res.json({ data });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(validateMovieId), asyncErrorBoundary(read)],
};

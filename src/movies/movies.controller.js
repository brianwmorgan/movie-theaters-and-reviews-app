const moviesService = require("./movies.service");

async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
};

module.exports = {
    list,
};
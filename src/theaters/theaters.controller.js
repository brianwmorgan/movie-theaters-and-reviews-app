const service = require("./theaters.service");

async function list(req, res, next) {
    const data = await service.list();
    res.json({ data });
};

module.exports = {
    list,
};

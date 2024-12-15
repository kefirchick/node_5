const { isIdValid, getFilmPos } = require("../helper");

async function read(req, res, next) {
    if (!isIdValid(req.body.id)) {
        return next({ status: 400, message: "Not A Valid Id" });
    }

    const pos = getFilmPos(req.top250, req.body.id);

    if (pos === -1) {
        return next({ status: 404, message: "No Such Id" });
    }

    res.json(req.top250[pos]);
}

module.exports = { read };

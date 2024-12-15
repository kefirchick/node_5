const {
    modelValidation,
    isIdValid,
    getFilmPos,
    mapPositions,
    writeTop250,
} = require("../helper");

async function update(req, res, next) {
    if (!isIdValid(req.body.id)) {
        return next({ status: 400, message: "Not A Valid Id" });
    }

    const pos = getFilmPos(req.top250, req.body.id);

    if (pos === -1) {
        return next({ status: 404, message: "No Such Id" });
    }

    const film = req.top250[pos];
    req.top250.splice(pos, 1);

    for (const key in req.body) {
        if (modelValidation[key]?.(req.body[key])) {
            film[key] = req.body[key];
        }
    }

    req.top250.splice(film.position - 1, 0, film);
    mapPositions(req.top250);
    await writeTop250(req.top250);
    res.json(film);
}

module.exports = { update };

const { modelValidation, mapPositions, writeTop250 } = require("../helper");

async function create(req, res, next) {
    const film = { id: Date.now() };

    for (const key in req.body) {
        if (!modelValidation[key]?.(req.body[key])) {
            return next({
                status: 400,
                message: `Not A Valid Property: ${key}`,
            });
        }

        film[key] = req.body[key];
    }

    req.top250.splice(film.position - 1, 0, film);
    mapPositions(req.top250);
    await writeTop250(req.top250);
    res.json(film);
}

module.exports = { create };

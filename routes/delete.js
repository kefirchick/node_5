const {
    isIdValid,
    getFilmPos,
    mapPositions,
    writeTop250,
} = require("../helper");

async function filmDelete(req, res, next) {
    if (!isIdValid(req.body.id)) {
        return next({ status: 400, message: "Not A Valid Id" });
    }

    const pos = getFilmPos(req.top250, req.body.id);

    if (pos === -1) {
        return next({ status: 404, message: "No Such Id" });
    }

    req.top250.splice(pos, 1);
    mapPositions(req.top250);
    await writeTop250(req.top250);
    res.sendStatus(204);
}

module.exports = { filmDelete };

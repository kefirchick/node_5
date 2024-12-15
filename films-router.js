const express = require("express");
const jwt = require("jsonwebtoken");
const { readall } = require("./routes/readall");
const { read } = require("./routes/read");
const { filmDelete } = require("./routes/delete");
const { create } = require("./routes/create");
const { update } = require("./routes/update");

const filmsRouter = express.Router();

filmsRouter.use("/", (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next({ status: 401, message: "Access token required" });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET);

        if (!user) {
            return next({ status: 403, message: "Invalid credentials" });
        }

        req.user = user;
    } catch (err) {
        return next({ status: 403, message: "Invalid credentials" });
    }

    next();
});

filmsRouter.get("/readall", readall);
filmsRouter.get("/read", read);
filmsRouter.post("/create", create);
filmsRouter.post("/update", update);
filmsRouter.post("/delete", filmDelete);

module.exports = { filmsRouter };

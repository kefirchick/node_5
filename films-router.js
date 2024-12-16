const express = require("express");
const jwt = require("jsonwebtoken");
const { readall } = require("./routes/readall");
const { read } = require("./routes/read");
const { filmDelete } = require("./routes/delete");
const { create } = require("./routes/create");
const { update } = require("./routes/update");

const filmsRouter = express.Router();

function auth(isAdminOnly) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
    
        if (!token) {
            return next({ status: 401, message: "Access token required" });
        }
    
        try {
            const user = jwt.verify(token, process.env.SECRET);

            if (!user || (isAdminOnly && !user.super)) {
                return next({ status: 403, message: "Invalid credentials" });
            }
    
            req.user = user;
        } catch (err) {
            return next({ status: 403, message: "Invalid credentials" });
        }
    
        next();
    }
}

filmsRouter.get("/readall", auth(false), readall);
filmsRouter.get("/read", auth(false), read);
filmsRouter.post("/create", auth(true), create);
filmsRouter.post("/update", auth(true), update);
filmsRouter.post("/delete", auth(true), filmDelete);

module.exports = { filmsRouter };

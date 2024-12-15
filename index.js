const express = require("express");
const { router } = require("./router");
const { readTop250 } = require("./helper.js");

const PORT = 3000;

const app = express();

async function runServer() {
    const top250 = await readTop250();

    app.use(express.json());

    app.use("/api/films/", (req, res, next) => {
        req.top250 = top250;
        next();
    });

    app.use("/api/films", router);

    app.use((req, res, next) => {
        next({ status: 404, message: "Not Found" });
    });

    app.use((err, req, res, next) => {
        res.status(err.status ?? 500);
        res.json({ error: err.message });
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
    });
}

runServer();

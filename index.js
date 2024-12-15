require("dotenv").config();
const express = require("express");
const sequelize = require("./db-config");
const { filmsRouter } = require("./films-router");
const { authRouter } = require("./auth-router");
const { readTop250 } = require("./helper.js");

const app = express();

async function runServer() {
    const top250 = await readTop250();

    app.use(express.json());

    try {
        await sequelize.sync();
        console.log("Database synced successfully");
    } catch (error) {
        console.error("Error syncing database:", error);
    }

    app.use("/api/auth", authRouter);

    app.use("/api/films/", (req, res, next) => {
        req.top250 = top250;
        next();
    });

    app.use("/api/films", filmsRouter);

    app.use((req, res, next) => {
        next({ status: 404, message: "Not Found" });
    });

    app.use((err, req, res, next) => {
        res.status(err.status ?? 500);
        res.json({ error: err.message });
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}.`);
    });
}

runServer();

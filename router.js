const express = require("express");
const { readall } = require("./routes/readall");
const { read } = require("./routes/read");
const { filmDelete } = require("./routes/delete");
const { create } = require("./routes/create");
const { update } = require("./routes/update");

const router = express.Router();

router.get("/readall", readall);

router.get("/read", read);

router.post("/create", create);

router.post("/update", update);

router.post("/delete", filmDelete);

module.exports = { router };

function readall(req, res) {
    res.json(req.top250);
}

module.exports = { readall };

const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./helper");
const User = require("./models/User");

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.json(user);
    } catch (err) {
        return next({ status: 500, message: err.message });
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        const isValid = await bcrypt.compare(password, user.password);
        
        if (isValid) {
            const token = generateToken({ id: user.id, email });
            res.json({ token });
        } else {
            return next({ status: 403, message: "Invalid credentials" });
        }
    } catch (err) {
        return next({ status: 500, message: err.message });
    }
});

module.exports = { authRouter };

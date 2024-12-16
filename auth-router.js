const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./helper");
const manager = require("./models/manager");

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        // let's make an admin the 1st user registered
        if (user.id === 1) {
            user.super = true;
            await user.save();
        }

        res.json(user);
    } catch (err) {
        return next({ status: 500, message: err.message });
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await manager.findOne({ where: { email } });
        const isValid = await bcrypt.compare(password, user.password);
        
        if (isValid) {
            const token = generateToken({ id: user.id, super:user.super, email });
            res.json({ token });
        } else {
            return next({ status: 401, message: "Invalid credentials" });
        }
    } catch (err) {
        return next({ status: 401, message: "Invalid credentials" });
    }
});

module.exports = { authRouter };

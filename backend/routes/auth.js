const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create and save the new user
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        res.status(201).json({ message: "Sign Up Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Please Sign Up First" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is Not Correct" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json({ user: others });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../data/db.json");

function readData() {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Sign Up Route
router.post("/register", (req, res) => {
    const { email, username, password } = req.body;
    let data = readData();

    // Check if user already exists
    const userExists = data.users.some((user) => user.email === email);

    if (userExists) {
        return res.status(409).json({ message: "User Already Exists" });
    }

    // Add new user
    const newUser = {
        id: Date.now().toString(),
        email,
        username,
        password
    };

    data.users.push(newUser);
    writeData(data);

    res.status(201).json({ message: "User Registered Successfully" });
});

// Sign In Route
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const data = readData();

    // Check if user exists with the provided credentials
    const user = data.users.find((user) => user.email === email && user.password === password);

    if (user) {
        return res.json({ message: "Login successful", userId: user.id });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
});

module.exports = router;

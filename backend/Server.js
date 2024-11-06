const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow CORS for cross-origin requests
app.use(express.json());

// Connect to MongoDB
const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://tripathivandana086:user123@cluster0.4u1yh.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
conn();

// Import routes
const authRoutes = require("./routes/auth");

// Use routes
app.use("/api/v1", authRoutes);

// Start the server on a specific port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});
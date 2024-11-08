require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const connectDB = require("./conn/conn"); // Corrected path to conn.js

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB(); // Initialize database connection

// Import and use routes
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

app.use("/api/v1", authRoutes);
app.use("/api/v1", listRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

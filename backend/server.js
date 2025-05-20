const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

// Load environment variables
dotenv.config();

// Middleware (should come **before** routes)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Import and use routes
const routes = require("./routes");
app.use(routes);

// Test route
app.get("/", (req, res) => {
    res.send("hanji fer");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.error("Error while connecting to the database:", err.message);
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is running at", port);
});

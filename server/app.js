require("dotenv").config();
const connectToDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URI }));

// Connect to the database
connectToDB();

// Load routes
app.use("/api/auth", authRoutes);
module.exports = app;

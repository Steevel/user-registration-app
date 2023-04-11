require("dotenv").config();
const connectToDB = require("./config/db");
const express = require("express");
const app = express();

// Connect to the database
connectToDB();

module.exports = app;

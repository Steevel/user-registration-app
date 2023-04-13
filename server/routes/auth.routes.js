const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getUserData,
} = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/userdata", getUserData);

module.exports = router;

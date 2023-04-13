const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getUserData,
  updateUserData,
} = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getdata", getUserData);
router.put("/updatedata", updateUserData);

module.exports = router;

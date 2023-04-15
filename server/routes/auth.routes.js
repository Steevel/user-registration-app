const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getUserData,
  updateUserData,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getdata", getUserData);
router.put("/updatedata", updateUserData);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);

module.exports = router;

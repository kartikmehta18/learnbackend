const express = require("express");
const router = express.Router();
const userModel = require("../models/user-modal");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const {generateToken}= require("../utils/generateToken")
const {registerUsers} = require("../controllers/authController")
const{loginUsers} = require("../controllers/authController")

router.get("/", function (req, res) {
  res.send("user Router");
});   

router.post("/register",registerUsers )
router.post("/login",loginUsers )
// router.post("/logout",loginUsers )

module.exports = router;

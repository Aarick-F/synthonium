const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/registration");

// Load User Model
const User = require("../../models/User");

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({msg: "User test route"});
});

module.exports = router;
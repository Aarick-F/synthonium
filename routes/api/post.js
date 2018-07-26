const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => {
  res.json({msg: "Post test route!"});
});

// @route   GET api/post
// @desc    Get Posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/post
// @desc    Creates a post
// @access  Private
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  if(!isValid) {
    // If errors, send 400 with errors
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    title: req.body.title,
    synthType: req.body.synthType,
    notes: req.body.notes,
    userId: req.user.id,
    username: req.user.username
  });

  console.log(req.user);

  newPost.save()
    .then(post => res.json(post));
});

module.exports = router;
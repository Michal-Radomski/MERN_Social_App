const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
import {Response} from "express";

const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
import {CustomRequest} from "../../Interfaces";

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post("/", auth, check("text", "Text is required").notEmpty(), async (req: CustomRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log({user});

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    // console.log({post});

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

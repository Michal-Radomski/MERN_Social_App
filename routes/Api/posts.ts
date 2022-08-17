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

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({date: -1}); // From most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found - bad ObjectId"});
    }

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: "Post not found"});
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({msg: "User not authorized"});
    }

    await post.remove();

    res.json({msg: "Post removed"});
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({msg: "Post not found - bad ObjectId"});
    }

    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like: {user: typeof User}) => like.user.toString() === req.user.id)) {
      return res.status(400).json({msg: "Post already liked"});
    }

    post.likes.unshift({user: req.user.id});

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like: {user: typeof User}) => like.user.toString() === req.user.id)) {
      return res.status(400).json({msg: "Post has not yet been liked"});
    }

    // Get remove index
    const removeIndex = post.likes.map((like: {user: typeof User}) => like.user.toString()).indexOf(req.params.id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

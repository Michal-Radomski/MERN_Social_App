const express = require("express");
const router = express.Router();
import {Response} from "express";

const auth = require("../../middleware/auth");
const User = require("../../models/User");
import {CustomRequest} from "../../Interfaces";

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req: CustomRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log({user});
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

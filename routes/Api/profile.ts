const express = require("express");
const router = express.Router();
import {Response} from "express";

const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
import {CustomRequest} from "../../Interfaces";

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get("/me", auth, async (req: CustomRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({msg: "There is no profile for this user"});
    }

    // console.log({profile});
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

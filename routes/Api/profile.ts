const express = require("express");
const router = express.Router();
import {Response} from "express";
const {check, validationResult} = require("express-validator");

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

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  [check("status", "Status is required").notEmpty(), check("skills", "Skills is required").notEmpty()],
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    // Destructure the request
    const {
      githubusername,
      company,
      bio,
      location,
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      status,
      // Spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // Build a profile object
    const profileFields = {
      user: {},
      company: "",
      website: "",
      bio: "",
      status: "",
      githubusername: "",
      location: "",
      skills: "",
      social: {
        youtube: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        facebook: "",
      },
    };
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill: string) => skill.trim());
    }

    // console.log("profileFields.skills:", profileFields.skills);

    // Build socialFields object
    profileFields.social = {
      youtube: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      facebook: "",
    };
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({user: req.user.id});
      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
        // console.log({profile});
        return res.json(profile);
      }
      // Create profile
      profile = await new Profile(profileFields);
      await profile.save();
      // console.log({profile});
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

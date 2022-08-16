const express = require("express");
const router = express.Router();
import {Response} from "express";
const {check, validationResult} = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
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
    // console.log({rest});

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

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (_req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    // console.log({profiles});
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req: CustomRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({msg: "Profile not found"});
    // console.log({profile});
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({msg: "Bad ObjectId of the profile"});
    }
    return res.status(500).json({msg: "Server error"});
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts of the current user
// @access   Private
router.delete("/", auth, async (req: CustomRequest, res: Response) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id});
    // Remove user
    await User.findOneAndRemove({_id: req.user.id});
    //Todo: remove user's posts

    res.json({msg: "User deleted"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  auth,
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required and needs to be from the past").notEmpty(),
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {title, company, location, form, to, current, description} = req.body;
    const newExp = {title, company, location, form, to, current, description};
    try {
      const profile = await Profile.findOne({user: req.user.id});

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

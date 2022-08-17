const express = require("express");
const router = express.Router();
import {Response} from "express";
const {check, validationResult} = require("express-validator");
const config = require("config");
// const request = require("request");  //* -> Deprecated
import axios from "axios";

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

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/experience/:exp_id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    const removeIndex = profile.experience.map((item: {id: string}) => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({msg: "Server error"});
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  auth,
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required and needs to be from the past").notEmpty(),
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    // Destructure the request
    const {school, degree, fieldofstudy, from, to, current, description} = req.body;

    const newEdu = {school, degree, fieldofstudy, from, to, current, description};

    try {
      const profile = await Profile.findOne({user: req.user.id});

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete("/education/:edu_id", auth, async (req: CustomRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});
    // Get remove index
    const removeIndex = profile.education.map((item: {id: string}) => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({msg: "Server error"});
  }
});

//* Request Package - Deprecated
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
// router.get("/github/:username", async (req: CustomRequest, res: Response) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&clinet_id=${config.get(
//         "githubClientId"
//       )}&client_secret=${config.get("githubSecret")}`,
//       method: "GET",
//       headers: {"user-agent": "node.js"},
//     };

//     request(options, (error: string, response: {statusCode: number}, body: string) => {
//       if (error) {
//         console.error(error);
//       }
//       if (response.statusCode !== 200) {
//         return res.status(404).json({msg: "No Github profile found"});
//       }
//       res.json(JSON.parse(body));
//     });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(404).json({msg: "No Github profile found"});
//   }
// });

//* Axios Package
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", async (req: CustomRequest, res: Response) => {
  // console.log("req.params.username:", req.params.username);

  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&clinet_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`
    );
    const headers = {
      "user-agent": "node.js",
    };

    const gitHubResponse = await axios.get(uri, {headers});
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({msg: "No Github profile found"});
  }
});

module.exports = router;

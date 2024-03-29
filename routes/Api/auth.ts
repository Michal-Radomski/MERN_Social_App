const express = require("express");
const router = express.Router();
import {Response} from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");

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

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    // console.log({email, password});

    try {
      let user = await User.findOne({email});
      // console.log({user});

      if (!user) {
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // console.log({isMatch});

      if (!isMatch) {
        return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // console.log({payload});

      jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 36000}, (err: {message: string}, token: string) => {
        if (err) throw err;
        // console.log({token});
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

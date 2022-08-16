const express = require("express");
const router = express.Router();
import c from "config";
import {Request, Response} from "express";
const {check, validationResult} = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const normalize = require("normalize-url");

const User = require("../../models/User");

// // @route    GET api/users
// // @desc     Test route
// // @access   Public
// router.get("/", (_req: Request, res: Response) => {
//   res.send("User route - test route");
// });

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 8 or more characters").isLength({min: 8}),
  ],
  async (req: Request, res: Response) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      //* See if user exists
      let existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(400).json({errors: [{msg: "User already exists"}]});
      }

      //* Get user gravatar

      const avatar = gravatar.url(email, {
          size: "200", // size
          rating: "pg", // rating
          default: "mm", //default
        }),
        user = new User({
          name: name,
          email: email,
          avatar: avatar,
          password: password,
        });

      //* Encrypt password

      const salt = await bcrypt.genSalt(10);
      console.log({password});
      console.log({salt});

      user.password = await bcrypt.hash(password, salt);

      console.log(" - encrypted:", user.password);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      //* Return jsonwebtoken

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
import {Request, Response} from "express";
const {check, validationResult} = require("express-validator");

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
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 8 or more characters").isLength({min: 8}),
  (req: Request, res: Response) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    res.send("User route");
  }
);

module.exports = router;

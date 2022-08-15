const express = require("express");
const router = express.Router();
import {Request, Response} from "express";

// @route    GET api/profile
// @desc     Test route
// @access   Public
router.get("/", (_req: Request, res: Response) => {
  res.send("Profile route - test route");
});

module.exports = router;

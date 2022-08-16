export {};
const jwt = require("jsonwebtoken");
const config = require("config");
import {Response, NextFunction} from "express";

import {CustomRequest, User} from "../Interfaces";

module.exports = function (req: CustomRequest, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({msg: "No token, authorization denied"});
  }
  // console.log({token});

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (error: {message: string}, decoded: {user: User}) => {
      if (error) {
        return res.status(401).json({msg: "Token is not valid"});
      } else {
        // console.log({decoded});
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({msg: "Server Error"});
  }
};

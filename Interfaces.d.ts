// Types and Interfaces
import {Request} from "express";
import {Types} from "mongoose";

interface User {
  id: Types.ObjectId;
  name: string;
  avatar: string;
  password: string;
  date: Date;
}

interface CustomRequest extends Request {
  user: User;
}

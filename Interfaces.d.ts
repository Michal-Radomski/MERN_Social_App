// Types and Interfaces
import {Request} from "express";
import {Types} from "mongoose";

type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;

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

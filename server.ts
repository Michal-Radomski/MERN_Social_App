const express = require("express");
import {Request, Response} from "express";
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Define Routes
app.use("/api/users", require("./routes/Api/users"));
app.use("/api/auth", require("./routes/Api/auth"));
app.use("/api/profile", require("./routes/Api/profile"));
app.use("/api/posts", require("./routes/Api/posts"));

const port = (process.env.PORT || 5000) as number;

app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
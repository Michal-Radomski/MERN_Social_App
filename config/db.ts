const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// console.log({db});

const connectDB = async () => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then((con: {connection: {host: string}}) => {
        // console.log({con});
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
      });
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

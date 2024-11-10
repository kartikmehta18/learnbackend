const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

// $env:DEBUG="development:mongoose"
mongoose
  .connect(`${config.get("MONGODB_URI")}/project1`)
  .then(function () {
    // console.log("Connected to database");
    dbgr("Connected to database");
  })
  .catch(function (error) {
    console.log("Error connecting to database");
    console.log(error);
  });

module.exports = mongoose.connection;

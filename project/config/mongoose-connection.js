const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

mongoose.connect("mongodb://localhost:27017/config").then(function () {
  // console.log("Connected to database");
  dbgr("Connected to database");
})
.catch(function (error) {
  console.log("Error connecting to database");
  console.log(error);
});

module.exports = mongoose.connection;

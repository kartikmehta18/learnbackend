const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/config").then(function () {
  console.log("Connected to database");
})
.catch(function (error) {
  console.log("Error connecting to database");
  console.log(error);
});

module.exports = mongoose.connection;

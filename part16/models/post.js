const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: String,
  postdata: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", postSchema);

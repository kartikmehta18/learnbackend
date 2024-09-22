const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://practice:18%40June2004@cluster0.5nn8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  // mongoose
  //   .connect("mongodb://127.0.0.1:27017/practice")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
  usernsame: String,
  email: String,
  age: Number,
  posts:Array
});

module.exports = mongoose.model("user", userSchema);

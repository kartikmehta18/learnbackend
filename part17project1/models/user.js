const mongoose = require("mongoose");

mongoose
  // .connect(
  //   "mongodb+srv://practice:18%40June2004@cluster0.5nn8d.mongodb.net/newproject?retryWrites=true&w=majority&appName=Cluster0"
  // )
  .connect(
    "mongodb://localhost:27017/config"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  profilepic:{
    type:String,
    default:"default.png"
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

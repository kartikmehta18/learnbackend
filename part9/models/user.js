const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://practice:18%40June2004@cluster0.5nn8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const userSchema = new mongoose.Schema({
  image: String,
  email: String,
  name: String,
});


module.exports =mongoose.model("user", userSchema);
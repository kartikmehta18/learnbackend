const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    usernsame: "kartik",
    email: "kartik@gemail.com",
    age: 25,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "hey i am kartik",
    user: "66f0144316cfa17f0749d699",
  });
  let user = await userModel.findOne({
    _id: "66f0144316cfa17f0749d699",
  });
  user.posts.push(post._id);
   await user.save();
  res.send({post,user});
});

app.listen(3000);

const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/creat", async (req, res) => {
  let creat = await userModel.create({
    name: "shivani",
    username: "shiv",
    email: "shivanimehta650@gmail.com",
  });
  res.send(creat);
  console.log("Data created");
});

app.get("/read", async (req, res) => {
  let user = await userModel.find();
  res.send(user);
});

app.get("/oneread", async (req, res) => {
  let user = await userModel.findOne({ username: "shiv" });
  res.send(user);
});

app.get("/update", async (req, res) => {
  let update = await userModel.findOneAndUpdate(
    { username: "kartikmehta18" },
    { name: "kartik mehta" },
    { new: true }
  );
  res.send(update);
  console.log("Data created");
});

app.get("/oneread", async (req, res) => {
  let user = await userModel.findOne({ username: "shiv" });
  res.send(user);
});

app.get("/delete", async (req, res) => {
  let delet = await userModel.findOneAndDelete({ name: "kartik" });
  res.send(delet);
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

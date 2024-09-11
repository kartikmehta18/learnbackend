// npm init -y
// nom install express
// npm i nodemon -g
// nodemon script.js
// npm i ejs
// setup ejS AS A middelware for view engine

const express = require("express");
const app = express();
const path = require("path");

//render ejs file
app.set("view engine", "ejs");

// handel foe json data or form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  //   res.send("hello devs");
  res.render("index");
});

app.get("/read", (req, res) => {
  res.render("read");
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/delete", (req, res) => {
  res.render("delete");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

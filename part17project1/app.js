const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jwt
const { console } = require("inspector");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", isLoggedIn, (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  let = { username, name, age, email, password } = req.body;
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return res.send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });

      let token = jwt.sign({ email: email, userid: user._id }, "shh");
      res.cookie("token", token);
      res.send("User registered");
    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("something went wrong");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) res.status(200).send("you can login");
    else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  console.log(res.cookie);
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  console.log(req.cookies);
  next();
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

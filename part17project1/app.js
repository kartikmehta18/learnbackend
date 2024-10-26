const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jwt

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("post"); // Populate associated posts
    // console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("profile", { user }); // Pass the user to the template
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("An error occurred while fetching profile data");
  }
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  const post = await userModel
    .findOne({_id: req.user.id })
    .populate("user");
  console.log(user);
  post.likes.push(req.user.userid);
   await  post.save();
  res.render("profile", { user });
});

// app.get("/profile", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("post");
//     console.log(user);

//   res.render("profile", { user});
// });

app.post("/post", isLoggedIn, async (req, res) => {
  let { content, url } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  let post = await postModel.create({ user: user._id, content, url });

  user.post.push(post._id);
  await user.save();
  res.redirect("/profile");
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
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shh");
      res.cookie("token", token);
      res.status(200).send("you can login");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});
//middleware = it is a check condition
function isLoggedIn(req, res, next) {
  // console.log(req.cookies);
  // if(req.cookies.token === "") res.send("You must belogged in");
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shh");
    req.user = data;
  }
  next();
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const upload = require("./utils/multer");
const jwt = require("jsonwebtoken"); // Import jwt
// const crypto = require("crypto");
const path = require("path");
// const multer = require("multer");


app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images')
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     crypto.randomBytes(12, function (err,bytes){
//       const fn =  bytes.toString('hex') + path.extname(file.originalname)
//       cb(null, fn)
//     })

//   }
// })

// const upload = multer({ storage: storage })

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile/upload", (req, res) => {
  res.render("profileupload");
});

app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.profilepic =req.file.filename;
  await user.save();
  res.redirect("/profile");
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
  let post = await postModel.findOne({ _id: req.params.id });

  if (post?.likes?.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();

  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("edit", { post });
});

// app.get("/profile", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("post");
//     console.log(user);

//   res.render("profile", { user});
// });

app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );

  res.redirect("/profile");
});

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

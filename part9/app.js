const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Render index page
app.get("/", function (req, res) {
  res.render("index");
});

// Use POST method to create a new user
app.post("/create", async (req, res) => {
  try {
    let { image, email, name } = req.body;
    let newUser = await userModel.create({
      image,
      email,
      name,
    });
    res.redirect("/read");
    // res.json(newUser); // Send the created user back as JSON
    console.log("Data created");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// Render read page
app.get("/read", async (req, res) => {
  let data = await userModel.find();
  res.render("read", { data });
});
 
// Render edit page
app.get("/edit/:userid", async (req, res) => {
 let user=await userModel.findOne({ _id: req.params.userid});
 res.render("edit",{user});
});
 // update user
app.post("/update/:userid", async (req, res) => {
  let { image, email, name } = req.body;
  let user = await userModel.findOneAndUpdate({ _id: req.params.userid},{image , email ,name} ,  {new:true});
  res.redirect("/read");
 });
 
 // delete user
app.get("/delete/:id", async (req, res) => {
  let data = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

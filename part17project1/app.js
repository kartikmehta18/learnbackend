const express = require("express");
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (res, req) => {
  req.render("index");
});

app.post("/register", async (req, res) => {
  let ={username, name, age, email, password} = req.body;
  let user = await userModel.findOne({email: req.body.email});
  if (user) return res.send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err,hash)=>{
      
    })
  })
  //  userModel.create({
  //   usernsame: req.body.username,
  //   name: req.body.name,
  //   age: req.body.age,
  //   email: req.body.email,
  //   password: req.body. password,
  // });
});

app.listen(3000);

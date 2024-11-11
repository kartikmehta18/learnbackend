const userModel = require("../models/user-modal");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUsers = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("User already exists");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          // let token = jwt.sign({ email, id: user._id }, "hhh");  we can also add {expiresIn: "1h"}
          res.cookie("token", token);
          // res.send("User Registered");
          res.status(200).send( user);
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUsers = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .send("User does not exist / email  password incorrect");
    bcrypt.compare(password, user.password, function (err, result) {
      // res.send(result);
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(200).send("User Logged in");
      }else{
        return res
        .status(401)
        .send("User does not exist / email  password incorrect");
      }
    });
  } catch (error) {}
};


module.exports.logoutUsers = function (req, res) {
  try {
    res.cookie("token", ""); // Immediately expires the cookie
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error logging out");
  }
};
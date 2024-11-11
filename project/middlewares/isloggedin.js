const jwt = require("jsonwebtoken");
const userModel = require("../models/user-modal");

module.exports = async function (req, res, next) {
  // Check if the token exists
  if (!req.cookies.token) {
    req.flash("error", "Please login first");
    return res.redirect("/");
  }

  try {
    // Verify the JWT token
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    // Find the user by email in the decoded token, excluding the password field
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong.");
    res.redirect("/");
  }
};

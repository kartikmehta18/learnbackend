const jwt = require("jsonwebtoken");
const userModel = require("../models/user-modal");

module.exports = async function (req, res, next) {
  if (req.cokkies.token) {
    req.flash("error", "Please login first");
    return res.redirect("/");
  }

  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
      req.user = user;
      next();
  } catch (error) {
    req.flash("error", "something went wrong.");
    res.redirect("/");
  }
};

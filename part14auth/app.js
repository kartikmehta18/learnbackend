//JWT
const cookieParser = require("cookie-parser")
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(cookieParser())
app.get("/", function (req, res) {
  let token = jwt.sign({ email: "kartikmehta650@gmail.com" }, "secret");
  res.cookie("token",token);
  res.send("done");
  console.log(token);
});
app.get("/read", function (req, res) {
    console.log(req.cookies.token);
    let data =jwt.verify(req.cookies.token,"secret");
    console.log(data);  
})  

app.listen(3000);

// const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// app.use(cookieParser())

app.get("/", function (req, res) {
//  bcryption of password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("kartik", salt, function(err, hash) {
            console.log(hash);
            // Store hash in your password DB.
        });
    });
 
  res.send("done");
});


app.listen(3000);

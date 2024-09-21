//cookieParser and bcrypt

// const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// app.use(cookieParser())

app.get("/", function (req, res) {
//  bcryption of password $2b$10$zeNx81JLWS1jAxjI7mAYTuFXfQZskj5fX0ceG741vwGDOisTV0WrO
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("kartik", salt, function(err, hash) {
    //         console.log(hash);
    //         // Store hash in your password DB.
    //     });
    // });
    bcrypt.compare("kartik", "$2b$10$zeNx81JLWS1jAxjI7mAYTuFXfQZskj5fX0ceG741vwGDOisTV0WrO", function(err, result) {
        console.log(result);
    });
});


app.listen(3000);

const express = require("express")  ;
const app =express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine" ,"ejs");
app.use (express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
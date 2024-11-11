const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
//npm i express-session connect-flash
const expressSession = require("express-session");
const flash = require("connect-flash");

// env file use me aa e gi is se
require("dotenv").config();

const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose-connection");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

// app.get("/", function (req, res) {
// res.send("Jai Jinendra ");
// });

app.use("/owners", ownerRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

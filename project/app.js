const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
// env file use me aa e gi is se
require("dotenv").config();

const db = require("./config/mongoose-connection");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", function (req, res) {
// res.send("Jai Jinendra ");
// });

app.use("/owners", ownerRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

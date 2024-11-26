const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});

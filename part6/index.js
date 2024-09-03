// npm init -y
// nom install express
// npm i nodemon -g
// nodemon script.js
// npm i ejs
// setup ejS AS A middelware for view engine

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
//   res.send("hello devs");
res.render("index")
});

app.listen(3000);

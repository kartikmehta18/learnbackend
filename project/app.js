const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
res.send("Jai Jinendradee ");
});3

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

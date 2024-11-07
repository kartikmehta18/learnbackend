const express = require('express');
const app = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Jai Jinendra ");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
const express = require("express");
const app = express();

// app.use(function (req, res, next) {
// console.log("I am a middleware");
// next();
// });
//use middleware for convert json data or exampal form data english to hindi or fir english me convert karna

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res, next) {
  res.send("hey Dev i am kartik mern developer");
});
app.get("/about", function (req, res, next) {
  res.send("about page");
  //  return next(new Error('Error in / route'));
});
app.get("/profile", function (req, res, next) {
  // res.send('profile page')
  return next(new Error("Error in / route"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000);

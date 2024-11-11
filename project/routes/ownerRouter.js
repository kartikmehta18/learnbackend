const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

if (process.env.NODE_ENV === "development") {
  // console.log("This is working ");

  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("Owner already exists");
    }
    res.send("we can creat Owner ");
  });
}

router.get("/", function (req, res) {
  res.send("Owner Routerrr");
});
//$env:NODE_ENV="development"
// console.log(process.env.NODE_ENV);

module.exports = router;

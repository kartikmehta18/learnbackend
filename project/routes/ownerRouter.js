const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
//dev check
if (process.env.NODE_ENV === "development") {
  // console.log("This is working ");

  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("Owner already exists");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(200).send(createdOwner);
  });
}

router.get("/", function (req, res) {
  res.send("Owner Router");
});
//$env:NODE_ENV="development"
// console.log(process.env.NODE_ENV);

module.exports = router;

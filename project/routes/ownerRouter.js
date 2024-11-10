const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

router.get("/", function (req, res) {
  res.send("Owner Router");
});
//$env:NODE_ENV="development"
console.log(process.env.NODE_ENV);
if(process.env === "development"){
  console.log("This is working ");
}

router.post("/create",function(req,res){
  res.send("Owner Created");
})

module.exports = router;
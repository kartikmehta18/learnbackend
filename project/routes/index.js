const isLoggedin = require("../middlewares/isloggedin");

const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model"); // Assuming your product model file name

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    // Fetch products from the database
    const products = await productModel.find(); // Adjust based on your schema

    // Render the shop view with products data
    res.render("shop", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error loading shop page");
  }
});

module.exports = router;

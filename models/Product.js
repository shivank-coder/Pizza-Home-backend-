const mongoose = require("mongoose");
const { stringify } = require("querystring");
const ProductSchema = mongoose.Schema({
  ProductName: String,
  description: String,
  Price: Number,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);

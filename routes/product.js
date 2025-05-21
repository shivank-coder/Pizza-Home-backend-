const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { route } = require("./auth");

router.post("/createproduct", async (req, res) => {
  const { productName, description, price, image } = req.body;
  try {
    const product = new Product({ productName, description, price, image });
    await product.save();
    res.status(200).json({ message: "product is created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server issue " });
  }
});

router.get("/allproduct", async (req, res) => {
  try {
    const product = await Product.find();
    res
      .status(200)
      .json({ message: "all product are fetched", products: product });
  } catch (e) {
    res.status(500).json({ message: "issue while fetching all product" });
  }
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ message: "product is not found" });
    }
    res
      .status(200)
      .json({ message: "product is get successfully", product: product });
  } catch (e) {
    res.status(500).json({ e });
  }
});
router.put("/product/:id", async (req, res) => {
  const id = req.params.id;
  const { productName, description, price, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, description, price, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error updating product", error: e.message });
  }
});
router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ message: "product is not found" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: e.message });
  }
});
module.exports = router;

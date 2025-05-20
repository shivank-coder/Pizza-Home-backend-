const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//api for signup

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "user is already exist with same name" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashpassword });
    await user.save();
    res.status(200).json({ message: "signup successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      res.status(400).json({ message: "user is not exist" });
    }
    const ismatch = await bcrypt.compare(password, existing.password);
    if (!ismatch) {
      res.status(400).json({ message: "password is not correct" });
    }
    res.status(200).json({ message: "login is successfull" });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;

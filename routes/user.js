const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(200).json({ data: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals.js");

router.get("/", async (req, res) => {
  try {
    const animals = await Animals();
    res.status(200).json({ data: animals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, commonName, description } = req.body;
    const existingAnimal = await Animals.findOne({
      name,
      commonName,
      description,
    });
    if (
      name === undefined ||
      commonName === undefined ||
      description === undefined
    ) {
      return res.status(400).json({ message: "Every field must be entered!" });
    }

    if (existingAnimal) {
      return res.status(400).json({ error: "Animal already exists!" });
    }
    const newAnimal = new Animals({
      name: name,
      commonName: commonName,
      description: description,
    });
    await newAnimal.save();
    res.status(200).json({ message: "Animal description created!" });
  } catch (error) {}
});

module.exports = router;

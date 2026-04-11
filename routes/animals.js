const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals.js");

router.get("/", async (req, res) => {
  try {
    const animals = await Animals.find();
    res.status(200).json({ data: animals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, commonName, description } = req.body;
    if (
      name === undefined ||
      commonName === undefined ||
      description === undefined
    ) {
      return res.status(400).json({ message: "Every field must be entered!" });
    }

    const existingAnimal = await Animals.findOne({
      name,
      commonName,
      description,
    });

    if (existingAnimal) {
      return res.status(400).json({ error: "Animal already exists!" });
    }
    const newAnimal = new Animals({ name, commonName, description });
    await newAnimal.save();
    res.status(201).json({ message: "Animal description created!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Animals = require("../models/Animals.js");
const AnimalDetails = require("../models/AnimalDetails.js");

router.get("/", async (req, res) => {
  try {
    const animals = await Animals.find();
    res.status(200).json({ data: animals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const details = await AnimalDetails.findOne({ animalId: id }).populate(
      "animalId",
    );
    if (!details) {
      return res
        .status(404)
        .json({ message: "Details not found for this animal" });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingDetails = await AnimalDetails.findOne({ animalId: id });
    const animal = await Animals.findById(id);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    if (existingDetails) {
      return res
        .status(400)
        .json({ message: "Details already exist for this animal" });
    }
    const {
      commonName,
      scientificName,
      size,
      diet,
      habitat,
      range,
      latitude,
      longitude,
      description,
      detailedDescription,
    } = req.body;
    const newAnimalDetails = new AnimalDetails({
      animalId: id,
      commonName,
      scientificName,
      size,
      diet,
      habitat,
      range,
      latitude,
      longitude,
      description,
      detailedDescription,
    });
    await newAnimalDetails.save();
    res
      .status(201)
      .json({ message: "Animal details created!", data: newAnimalDetails });
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

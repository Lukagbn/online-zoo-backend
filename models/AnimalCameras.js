const mongoose = require("mongoose");

const AnimalCameraSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animals",
    required: true,
  },
  text: { type: String, required: true },
});

const AnimalCams = mongoose.model("AnimalCams", AnimalCameraSchema);
module.exports = AnimalCams;

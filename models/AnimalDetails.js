const mongoose = require("mongoose");

const AnimalDetailsSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animals",
    required: true,
  },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  size: { type: String, required: true },
  diet: { type: String, required: true },
  habitat: { type: String, required: true },
  range: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
});
const AnimalDetails = mongoose.model("AnimalDetails", AnimalDetailsSchema);
module.exports = AnimalDetails;

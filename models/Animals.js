const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  commonName: { type: String, required: true },
  description: { type: String, required: true },
});

const Animals = mongoose.model("Animals", AnimalSchema);
module.exports = Animals;

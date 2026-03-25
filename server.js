const express = require("express");
const app = express();
const PORT = 4000;

require("dotenv").config();
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose running!"))
  .catch((err) => console.log("error:", err));

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

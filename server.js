const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.js");
const animalsRoute = require("./routes/animals.js");
app.use("/users", userRoute);
app.use("/animals", animalsRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose running!"))
  .catch((err) => console.log("error:", err));

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

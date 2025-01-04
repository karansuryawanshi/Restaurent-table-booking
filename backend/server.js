const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const availability = require("./routes/availability");
const booking = require("./routes/booking");
const deleteing = require("./routes/delete");

const app = express();
const PORT = 3001;

// MongoDB connection setup
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/Restaurent?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use(bodyParser.json());
app.use(cors());

app.use("/api", availability);
app.use("/api", booking);
app.use("/api", deleteing);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

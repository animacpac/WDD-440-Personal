const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true }
});

module.exports = mongoose.model("About", aboutSchema);
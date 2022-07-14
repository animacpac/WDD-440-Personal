const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true }
});

module.exports = mongoose.model("Picture", pictureSchema);
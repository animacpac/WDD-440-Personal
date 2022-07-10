const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   description: { type: String},
   location: {type: String},
   imageUrl: {type: String},
});

module.exports = mongoose.model('Picture', pictureSchema);
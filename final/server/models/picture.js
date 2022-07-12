const mongoose = require('mongoose')
const pictureSchema = mongoose.Schema({
    id: { type: String, require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    location: { type: String, require: true},
    imageUrl: { type: String, require: true}

});

mongoose.model('Picture', pictureSchema);

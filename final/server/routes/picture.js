const sequenceGenerator = require('./sequenceGenerator');
const Picture = require('../models/picture');


var express = require('express');
const picture = require('../models/picture');
var router = express.Router();
module.exports = router; 

router.get('/', (req, res, next) => {

    Picture.find()
        .then(pictures => {
            res.status(200).json({
                message: 'Pictures fetched successfully!',
                pictures: pictures
            });
        })
        .catch(error => {
            res.status(500).json({
              message: 'An error occurred',
              error: error
        });
    });
});
// Post the information
router.post('/', (req, res, next) => {
    const maxPictureId = sequenceGenerator.nextId("pictures");

    const picture = new Picture({
        id: maxPictureId,
        name: req.body.name,
        description: req.body.imageUrl,
        location: req.body.email,
        imageUrl: req.body.phone,
        
    });
    picture.save()
        .then(createdPicture => {
            res.status(201).json({
                message: 'Picture added successfully',
                document: createdPicture
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

//Update the information
router.put('/:id', (req, res, next) => {
    Picture.findOne({ id: req.params.id })
        .then(picture => {
            picture.name = req.body.name;
            picture.description = req.body.description;
            picture.location = req.body.location;
            picture.url = req.body.url;

            Picture.updateOne({ id: req.params.id }, picture)
                .then(result => {
                    res.status(204).json({
                        message: 'Picture updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Picture not found.',
                error: { picture: 'Picture not found' }
            });
        });
});
//Delete the request
router.delete("/:id", (req, res, next) => {
    Picture.findOne({ id: req.params.id })
        .then(picture => {
            Picture.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Picture deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Picture not found.',
                error: { picture: 'Document not found' }
            });
        });
});
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');


var express = require('express');
const contact = require('../models/contact');
var router = express.Router();
module.exports = router; 
// Gets the list of contacts
router.get('/', (req, res, next) => {

    Contact.find()
        .populate("group")
        .then(contacts => {
            res.status(200).json({
                message: 'Contacts fetched successfully!',
                contacts: contacts
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
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        email: req.body.email,
        phone: req.body.phone,
        group: req.body.group,
    });
    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                document: createdContact
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
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name;
            contact.description = req.body.description;
            contact.url = req.body.url;

            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: 'Contact updated successfully'
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
                message: 'Contact not found.',
                error: { contact: 'Contact not found' }
            });
        });
});
//Delete the request
router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Contact deleted successfully"
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
                message: 'Contact not found.',
                error: { contact: 'Document not found' }
            });
        });
});
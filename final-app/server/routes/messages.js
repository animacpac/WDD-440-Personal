const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/message');

var express = require('express');
var router = express.Router();
module.exports = router;

// Gets the list of messages
router.get('/', (req, res, next) => {

    Message.find()
        .populate("group")
        .then(messages => {
            res.status(200).json({
                messages: messages
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});
// Post the information
router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender,
    });
    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                message: createdMessage
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
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.name = req.body.name;
            message.description = req.body.description;
            message.url = req.body.url;

            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
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
                message: 'Message not found.',
                error: { message: 'Message not found' }
            });
        });
});
//Delete the request
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: "Message deleted successfully"
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
                message: 'Message not found.',
                error: { message: 'Document not found' }
            });
        });
});
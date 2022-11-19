const express = require('express'); //import express
const multer = require('multer');
const upload = multer();

const {
    createEvent,
    readEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
}=require('../controllers/eventController'); //import the Controller functions

const router=express.Router(); //initiate express router

router.post('/', createEvent);

router.post('/upload', upload.single('file'), uploadEventImage)

router.get('/:id', readEvent);

router.patch('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports=router;


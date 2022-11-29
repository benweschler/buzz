const express = require('express'); //import express
const multer = require('multer');
const upload = multer();

const {
    createEvent,
    readEvent,
    updateEvent,
    deleteEvent,
    paginateEvents,
    endEvent
}=require('../controllers/eventController'); //import the Controller functions

const router=express.Router(); //initiate express router

router.post('/', upload.single('file'), createEvent);

router.get(/paginate$/, paginateEvents);

router.get('/:id', readEvent);

router.patch('/end/:id', endEvent);

router.patch('/:id', upload.single('file'), updateEvent);

router.delete('/:id', deleteEvent);

module.exports=router;


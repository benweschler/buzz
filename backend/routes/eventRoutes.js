const express = require('express'); //import express

const {
    createEvent,
    readEvent,
    updateEvent,
    deleteEvent,
}=require('../controllers/eventController'); //import the Controller functions

const router=express.Router(); //initiate express router

router.post('/', createEvent);

router.get('/:id', readEvent);

router.patch('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports=router;


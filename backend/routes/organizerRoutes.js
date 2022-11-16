const express = require('express'); //import express

const {
    createOrganizer,
    readOrganizer,
    readOrganizerByEmail,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
}=require('../controllers/organizerController'); //import the Controller functions

const router=express.Router(); //initiate express router

router.post('/', createOrganizer);

router.get(/getall$/, getAllOrganizerEvents);

router.get('/:id', readOrganizer);

router.patch('/:id', updateOrganizer);

router.delete('/:id', deleteOrganizer);


module.exports=router;


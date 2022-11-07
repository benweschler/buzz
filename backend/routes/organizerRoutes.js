const express = require('express'); //import express

const {
    createOrganizer,
    readOrganizer,
    readOrganizerByEmail,
    updateOrganizer,
    deleteOrganizer,
}=require('../controllers/organizerController'); //import the Controller functions

const router=express.Router(); //initiate express router

router.post('/', createOrganizer);

router.get('/:id', readOrganizer);

router.get('*', readOrganizerByEmail);

router.patch('/:id', updateOrganizer);

router.delete('/:id', deleteOrganizer);


module.exports=router;


const express = require('express'); //import express

const {
    createOrganizer,
    readOrganizer,
    readOrganizerByEmail,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
    createOrganizerInAuth,
    createOrganizerAndSignup,
    authenticateOrganizer,
    tokenTest
}=require('../controllers/organizerController'); //import the Controller functions

const router=express.Router(); //initiate express router

// Create an organizer in authentication
router.post(/signup$/, createOrganizerInAuth);

// Signup an organizer and create their document
router.post(/signup_create$/, createOrganizerAndSignup);

// Authenticate an organizer and respond with the authentication token
router.get(/signin$/, authenticateOrganizer);

// Test token
router.get(/token$/, tokenTest);

router.post('/', createOrganizer);

router.get(/getall$/, getAllOrganizerEvents);

router.get('/:id', readOrganizer);

router.get('*', readOrganizerByEmail);

router.patch('/:id', updateOrganizer);

router.delete('/:id', deleteOrganizer);


module.exports=router;


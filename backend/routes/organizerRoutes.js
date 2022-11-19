const express = require('express'); //import express
const multer = require('multer');
const upload = multer();

const {
    createOrganizer,
    readOrganizer,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
    uploadOrganizerImage,
} = require('../controllers/organizerController'); //import the Controller functions

const router = express.Router(); //initiate express router

router.post('/', createOrganizer);

router.get(/getall$/, getAllOrganizerEvents);

router.post('/upload', upload.single('file'), uploadOrganizerImage);

router.get('/:id', readOrganizer);

router.patch('/:id', updateOrganizer);

router.delete('/:id', deleteOrganizer);


module.exports=router;


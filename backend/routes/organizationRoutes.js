const express = require('express'); //import express
const multer = require('multer');
const upload = multer();

const {
    createOrganization,
    readOrganization,
    readOrganizationByName,
    updateOrganization,
    deleteOrganization,
    getAllOrganizationEvents,
    uploadOrganizationImage,
} = require('../controllers/organizationController'); //import the Controller functions

const router = express.Router(); //initiate express router

router.post('/', createOrganization);

router.get(/getall$/, getAllOrganizationEvents);

router.post('/upload', upload.single('file'), uploadOrganizationImage);

router.get('/:id', readOrganization);

router.get('*', readOrganizationByName);

router.patch('/:id', updateOrganization);

router.delete('/:id', deleteOrganization);


module.exports=router;


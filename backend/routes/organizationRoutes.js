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
  getAllActiveEvents
} = require('../controllers/organizationController'); //import the Controller functions

const router = express.Router(); //initiate express router

router.post('/', upload.single('file'), createOrganization);

router.get("/getall/:id", getAllOrganizationEvents);

router.get("/active/:id", getAllActiveEvents)

router.get('/:id', readOrganization);

router.get('*', readOrganizationByName);

router.patch('/:id', upload.single('file'), updateOrganization);

router.delete('/:id', deleteOrganization);


module.exports = router;


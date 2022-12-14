const express = require('express');
const multer = require('multer');
const upload = multer();

const {
  createUser,
  readUser,
  readUserByEmail,
  updateUser,
  deleteUser,
  authenticateUser,
  verifyToken,
  revokeToken,
  addUserToOrg,
  validateUserOTP,
  addUserToEvent,
  followOrg,
  checkIn
} = require('../controllers/userController');

const router = express.Router();

// Authenticate a user and respond with the authentication token
router.post(/signin$/, authenticateUser);

// Verify Token
router.get('/token/:token', verifyToken);

// Revoke Token
router.get('/signout/:id', revokeToken);

// Validate OTP QRCode
router.get('/validateOTP/:id/:hmac', validateUserOTP);

// Create a user in Firestore and in Firebase Auth
router.post('/', upload.single('file'), createUser);

// Read a user
router.get('/:id', readUser);

// Read a user by their email
router.get('*', readUserByEmail);

//Add user as member to organization
router.patch(/add$/, addUserToOrg);

//check in user
router.patch(/checkIn$/, checkIn)

//follow org
router.patch(/follow$/, followOrg);

//Add user to event
router.patch(/register$/, addUserToEvent)

// Update a user
router.patch('/:id', upload.single('file'), updateUser);

// Delete a user
router.delete('/:id', deleteUser);


module.exports = router;
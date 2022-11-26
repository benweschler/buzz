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
    tokenTest,
    uploadUserImage,
    addUserToOrg,
    generateUserOTP,
    validateUserOTP,
    addUserToEvent,
    followOrg,
    unfollowOrg,
    getFeed
} = require('../controllers/userController');

const router = express.Router();

// Authenticate a user and respond with the authentication token
router.get(/signin$/, authenticateUser);

// Test token
router.get(/token$/, tokenTest);

// Generate OTP QRCode
router.get('/generateOTP/:id', generateUserOTP);

// Validate OTP QRCode
router.get(/validateOTP$/, validateUserOTP);

// get feed
router.get(/feed$/, getFeed);

// Upload image to Firebase Storage
router.post('/upload', upload.single('file'), uploadUserImage);

// Create a user in Firestore and in Firebase Auth
router.post('/', createUser);

// Read a user
router.get('/:id', readUser);

// Read a user by their email
router.get('*', readUserByEmail);

//Add user as member to organization
router.patch(/add$/, addUserToOrg);

//unfollow org
router.patch(/unfollow$/, unfollowOrg);

//follow org
router.patch(/follow$/, followOrg);

//Add user to event
router.patch(/register$/,addUserToEvent)

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);



module.exports = router;
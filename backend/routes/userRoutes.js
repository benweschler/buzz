const express = require('express');

const {
    createUser,
    readUser,
    readUserByEmail,
    updateUser,
    deleteUser,
    createUserInAuth,
    authenticateUser,
    tokenTest
} = require('../controllers/userController');

const router = express.Router();

// Create a user in authentication
router.post(/signup$/, createUserInAuth)

// Authenticate a user and respond with the authentication token
router.get(/signin$/, authenticateUser)

// Test token
router.get(/token$/, tokenTest)

// Create a user in firestore
router.post('/', createUser);

// Read a user
router.get('/:id', readUser);

// Read a user by their email
router.get('*', readUserByEmail);

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
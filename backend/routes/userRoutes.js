const express = require('express');

const {
    createUser,
    readUser,
    readUserByEmail,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Create a user
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
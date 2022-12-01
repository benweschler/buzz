const express = require('express');

const {
  filter,
  userRegistered
} = require('../controllers/utilityController');

const router = express.Router();

router.put('/filter', filter)

router.get("/:userid/:eventid",userRegistered )

module.exports = router
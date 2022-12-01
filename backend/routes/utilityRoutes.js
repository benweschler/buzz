const express = require('express');

const {
  filter,
  userRegistered,
  userOrgRelation
} = require('../controllers/utilityController');

const router = express.Router();

router.put('/filter', filter)

router.get("/:userid/:eventid",userRegistered )

router.get("/org/:userid/:orgid", userOrgRelation)

module.exports = router
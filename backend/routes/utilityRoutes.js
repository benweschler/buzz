const express = require('express');

const {
 filterEvents
     }=require('../controllers/utilityController');

const router=express.Router();

router.get('/', filterEvents);

module.exports=router
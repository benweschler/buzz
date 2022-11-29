const express = require('express');

const {
 filter
     }=require('../controllers/utilityController');

const router=express.Router();

router.get('/filter', filter)


module.exports=router
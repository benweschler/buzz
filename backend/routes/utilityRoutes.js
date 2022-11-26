const express = require('express');

const {
 filterTags,
filterPopularity
     }=require('../controllers/utilityController');

const router=express.Router();

router.get('/popular', filterPopularity);

router.get('/tags', filterTags);

module.exports=router
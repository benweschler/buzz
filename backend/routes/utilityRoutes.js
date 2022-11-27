const express = require('express');

const {
 filterTags,
filterPopularity,
getTags
     }=require('../controllers/utilityController');

const router=express.Router();

router.get('/popular', filterPopularity);

router.get('/getTags', getTags)

router.get('/tags', filterTags);


module.exports=router
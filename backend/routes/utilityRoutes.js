const express = require('express');

const {
 filterTags,
filterPopularity,
getTags,
eventsTonight
     }=require('../controllers/utilityController');

const router=express.Router();

router.get('/popular', filterPopularity);

router.get('/getTags', getTags)

router.get('/tags', filterTags);

router.get('/tonight', eventsTonight)


module.exports=router
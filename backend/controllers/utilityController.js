const TAGS=require("../constants/utilityConstants"); //import tags
const { database } = require('../firebase-admin/index'); //import firebase
const { FieldValue } = require('@google-cloud/firestore');
const { wait } = require("@testing-library/user-event/dist/utils");

const byElementCount = (array) => {
    let counts = {};
    for (let tag of array) {
        counts[tag] ? ++counts[tag] : counts[tag] = 1;
    }
    
    return Object.keys(counts).sort((a, b) => counts[a] > counts[b] ? -1 : 1);
}


const filterEvents = async (req, res) => {
    let tags = req.body.tags;
    if(!tags || tags.length == 0) {
        res.status(400).json({
            error: 'No tags found'
        });
    }
    let result = [];
    for(let i = 0; i < tags.length; i++) //loop through all the tags
    {
        let eventRef=database.collection('Tags').doc(tags[i]); //search db for the current tag
        await eventRef.get().then((tagDoc) => {  //wait for the query to happen
            if (tagDoc.exists){
                //console.log(tagDoc.data());
                array=(tagDoc.data());
                //console.log(array.Events);
                result=result.concat(array.Events);
                //console.log(result);
            }
        })   
    }
    result = byElementCount(result);
    if(result.length > 20) //if over 20 we trim it down to 20
    {
        result = result.slice(0,21);
    }
    let resultData = [];
    for(let i = 0;i < result.length; i++){
        await database.collection('Events').doc(result[i]).get().then((event) => {
            if(event.exists) {
                //console.log(event.data());
                resultData.push(event.data());
            }
        })
    }
    res.status(200).json({
        Events: resultData
    })
}

const updateTags = (oldTags, newTags, eventID) => {
    let addTags = newTags.filter(x => !oldTags.includes(x)); //things that are in the new tags but not the old tags need to be added
    let removeTags = oldTags.filter(x => !newTags.includes(x)); //things that are in the old tags but not in the new tags need to be removed
    for(let i = 0;i < removeTags.length; i++) //remove each tag that needs to be removed
    {
        let eventRef = database.collection('Tags').doc(removeTags[i]);
        eventRef.update({
            "Events": FieldValue.arrayRemove(eventID)
        })
    }
    //then use unionarray to add the new tags to the tag doc
    for(let i=0;i<addTags.length;i++) //remove each tag that needs to be removed
    {
        let eventRef=database.collection('Tags').doc(addTags[i]);
        eventRef.update({
            "Events": FieldValue.arrayUnion(eventID)
        })
    }
}


module.exports={
    filterEvents,
    updateTags
}

const TAGS=require("../constants/utilityConstants"); //import tags
const { database } = require('../firebase-admin/index'); //import firebase
const { FieldValue } = require('@google-cloud/firestore');

Array.prototype.byCount= function(){
    var itm, a= [], L= this.length, o= {};
    for(var i= 0; i<L; i++){
        itm= this[i];
        if(!itm) continue;
        if(o[itm]== undefined) o[itm]= 1;
        else ++o[itm];
    }
    for(var p in o) a[a.length]= p;
    return a.sort(function(a, b){
        return o[b]-o[a];
    });
}


const filterEvents=async(req, res) =>{
    let tags=req.body.tags;
if(!tags||tags.length==0){
    res.status(400).json({
        error:'No tags found'
    });
}
let result=[];
for(let i=0;i<tags.length;i++) //loop through all the tags
{
let eventRef=database.collection('Tags').doc(tags[i]); //search db for the current tag
await eventRef.get().then((tagDoc) => {  //wait for the query to happen
    if (tagDoc.exists){
        //console.log(tagDoc.data());
        array=(tagDoc.data());
        //console.log(array.Events);
        result=result.concat(array.Events);
        //console.log(result);
    }})
        
    }
result=result.byCount();
if(result.length>20)
{
    result=result.slice(0,21);
}
res.status(200).json({
    Events: result
})
}

function updateTags(oldTags, newTags, eventID)
{
let addTags=newTags.filter(x=>!oldTags.includes(x)); //things that are in the new tags but not the old tags need to be added
let removeTags=oldTags.filter(x=>!newTags.includes(x)); //things that are in the old tags but not in the new tags need to be removed
for(let i=0;i<removeTags.length;i++) //remove each tag that needs to be removed
{
    let eventRef=database.collection('Tags').doc(removeTags[i]);
    eventRef.update({
        "Events": FieldValue.arrayRemove(eventID)
    })
}
//then use unionaray to add the new tags to the tag doc
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

const {TAGS}=require("../constants/utilityConstants"); //import tags
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

const sortByPop =(events)=>{
    return events.sort((event1, event2)=>
    (event1.attendees.length<event2.attendees.length) ?1 : (event1.attendees.length>event2.attendees.length? -1:0))
}

const filterTags = async (req, res) => {
    let tags = req.body.tags;
    if(!tags || tags.length == 0) {
        res.status(400).json({
            error: 'No tags found'
        });
    }
    let result = [];
    // console.log(typeof(TAGS))
    // console.log(TAGS.get(tags[0]))
    for(let i = 0; i < tags.length; i++) //loop through all the tags
    {
        let eventRef=database.collection('Tags').doc(TAGS.get(tags[i])); //search db for the current tag
        await eventRef.get().then((tagDoc) => {  //wait for the query to happen
            if (tagDoc.exists){
                //console.log(tagDoc.data());
                //console.log(tagDoc.data())
                array=(tagDoc.data());
                //console.log(array.Events);
                result=result.concat(array.events);
                //console.log(result);
            }
        }).catch((error)=>{
            res.status(500).json({
                error: error
            })
        })  
    }
    result = byElementCount(result);
    //console.log(result)
    let resultData = [];
    for(let i = 0;i < result.length; i++){
        await database.collection('Events').doc(result[i]).get().then((event) => {
            if(event.exists) {
                //console.log(event.data());
                resultData.push(event.data());
            }
        }).catch((error)=>{
            res.status(500).json({
                error: error
            })
            return
        })
    }
    res.status(200).json({
        Events: resultData
    })
}

const updateTags = (oldTags, newTags, eventID) => {
    console.log("tagging")
    let addTags = newTags.filter(x => !oldTags.includes(x)); //things that are in the new tags but not the old tags need to be added
    let removeTags = oldTags.filter(x => !newTags.includes(x)); //things that are in the old tags but not in the new tags need to be removed
    for(let i = 0;i < removeTags.length; i++) //remove each tag that needs to be removed
    {
        let eventRef = database.collection('Tags').doc(TAGS.get(removeTags[i]));
        eventRef.update({
            "events": FieldValue.arrayRemove(eventID)
        })
    }
    //then use unionarray to add the new tags to the tag doc
    for(let i=0;i<addTags.length;i++) //remove each tag that needs to be removed
    {
        let eventRef=database.collection('Tags').doc(TAGS.get(addTags[i]));
        eventRef.update({
            "events": FieldValue.arrayUnion(eventID)
        })
    }
}

const filterPopularity= async (req,res)=>{
    eventRef=database.collection('Events')
    eventRef.where('has_ended', '==', false).get().then((events)=>{
        if(events.empty){
            res.status(404).json({
                error: "no events found"
            })
            return
        }
        let eventData=[]
        events.forEach(doc=>{
            eventData.push(doc.data())
        })
        
        sortedEvents=sortByPop(eventData)
        let i=0
        let val=sortedEvents.map(event=>event.attendees)
        results=[]
        while(i!=sortedEvents.length)
        {
            if(Object.keys(val[i]).length==0)
                break;
            results.push(sortedEvents[i])
            i++
        }
        res.status(200).json({
            Events: results
        })
    }).catch((error)=>{
        res.status(500).json({
            error: error
        })
    })

}

const getTags=async(req,res)=>
{
console.log(TAGS)
const tags=[]
for(const key of TAGS.keys()){
    tags.push(key)
}
res.status(200).json({
Tags: tags
}) 
}

const eventsTonight =async (req, res)=>{
    results=[]
    const curr=new Date(Date.now())
    //console.log(curr.getTime())
   const currHour=curr.getHours()
   let max=new Date(curr.getTime())
    max.setHours(6,0,0,0)
    //console.log(curr.getTime())
    if(currHour>=6){
        max.setDate(curr.getDate()+1)
    }
    //console.log(max.getTime())
   const events=await database.collection("Events").where("has_ended", "==", false).where("date", "<=", max.getTime()).where("date", ">", curr.getTime()).get()
   if(events.empty)
   {
    res.status(404).json({
        error:"no events found"
    })
    return
   }
   events.forEach(doc=>{
    results.push(doc.data())
})
results=sortByPop(results)
res.status(200).json({
    events: results
})
}


module.exports={
filterTags,
updateTags,
filterPopularity,
sortByPop,
getTags,
eventsTonight
}

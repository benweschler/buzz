const { TAGS } = require("../constants/utilityConstants"); //import tags
const { database } = require("../firebase-admin/index"); //import firebase
const { FieldValue } = require("@google-cloud/firestore");
const { wait } = require("@testing-library/user-event/dist/utils");
const { query } = require("express");

const byElementCount = (array) => {
  let counts = {};
  for (let tag of array) {
    counts[tag] ? ++counts[tag] : (counts[tag] = 1);
  }

  return Object.keys(counts).sort((a, b) => (counts[a] > counts[b] ? -1 : 1));
};

const sortByPop = (events) => {
  return events.sort((event1, event2) =>
    event1.attendees.length < event2.attendees.length
      ? 1
      : event1.attendees.length > event2.attendees.length
      ? -1
      : 0
  );
};

const ilterTags = async (req, res) => {
  let tags = req.body.tags;
  if (!tags || tags.length == 0) {
    res.status(400).json({
      error: "No tags found",
    });
  }
  let result = [];
  let tagRef=await database.collection('Tags').doc(TAGS.get(tags[0])).get()
  result=tagRef.data().events
let j=1
while(j<tags.length)
{
    let query=await database.collection('Tags').doc(TAGS.get(tags[j])).get()
    query=query.data().events
    result= result.filter(x=>query.includes(x)) //gets the union of the current query and the first one
    j++
} 
  let resultData=[]
  for (let i = 0; i < result.length; i++) {
    await database.collection("Events").doc(result[i]).get()
      .then((event) => {
        //console.log(event.data().date)
        if (event.exists&&event.data().date>Date.now()) {
          //console.log(event.data());
          resultData.push(event.data());
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });

        return;
      });
  }
  resultData=sortByPop(resultData)
  res.status(200).json({
    Events: resultData,
  });
};

const updateTags = (oldTags, newTags, eventID) => {
  let addTags = newTags.filter((x) => !oldTags.includes(x)); //things that are in the new tags but not the old tags need to be added
  let removeTags = oldTags.filter((x) => !newTags.includes(x)); //things that are in the old tags but not in the new tags need to be removed
  for (
    let i = 0;
    i < removeTags.length;
    i++ //remove each tag that needs to be removed
  ) {
    let eventRef = database.collection("Tags").doc(TAGS.get(removeTags[i]));
    eventRef.update({
      events: FieldValue.arrayRemove(eventID),
    });
  }
  //then use unionarray to add the new tags to the tag doc
  for (
    let i = 0;
    i < addTags.length;
    i++ //remove each tag that needs to be removed
  ) {
    let eventRef = database.collection("Tags").doc(TAGS.get(addTags[i]));
    eventRef.update({
      events: FieldValue.arrayUnion(eventID),
    });
  }
};

const filterPopularity = async (req, res) => {
  eventRef = database.collection("Events");
  eventRef
    .where("date", ">", Date.now())
    .get()
    .then((events) => {
      if (events.empty) {
        res.status(404).json({
          error: "no events found",
        });
        return;
      }
      let eventData = [];
      events.forEach((doc) => {
        eventData.push(doc.data());
      });

      sortedEvents = sortByPop(eventData);
      let i = 0;
      let val = sortedEvents.map((event) => event.attendees);
      results = [];
      while (i != sortedEvents.length) {
        results.push(sortedEvents[i]);
        i++;
      }
      res.status(200).json({
        Events: results,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const getTags = async (req, res) => {
  const tags = [];
  for (const key of TAGS.keys()) {
    tags.push(key);
  }
  res.status(200).json({
    Tags: tags,
  });
};

const eventsTonight = async () => {
  results = [];
  const curr = new Date(Date.now());
  //console.log(curr.getTime())
  const currHour = curr.getHours();
  let max = new Date(curr.getTime());
  max.setHours(6, 0, 0, 0);
  //console.log(curr.getTime())
  if (currHour >= 6) {
    max.setDate(curr.getDate() + 1);
  }
  //console.log(max.getTime())
  const events = await database
    .collection("Events")
    .where("date", "<=", max.getTime())
    .where("date", ">", curr.getTime())
    .get();
  if (events.empty) {
    return events;
  }
  events.forEach((doc) => {
    results.push(doc.data());
  });
  return results
};

const filterTags=(events, tags)=>{
results=[]
events.forEach((event)=>{
  tags.forEach((tag)=>{
    if(!event.tags.includes(tag))
      return
  })
results.push(event)
})
return results
}


const filter=async (req, res)=>{
  let events=[]
  if(req.body.tonight)
  {
    events= await eventsTonight()
    if (events==[]){
      res.status(404).json({
       error:"no events found for tonight"
      })
    }
  }
  else{
    query = await database.collection("Events").where("date", ">", Date.now())
    query.forEach((event)=>{
      events.push(event.data())
    })
  }
  if(tags){
    events=filterTags(events, req.body.tags)
  }
  events=sortByPop(events)
  return events
}

module.exports = {
  filterTags,
  updateTags,
  filterPopularity,
  sortByPop,
  getTags,
  eventsTonight,
};

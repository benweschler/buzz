const {database} = require("../firebase-admin/index"); //import firebase
const {FieldValue} = require("@google-cloud/firestore");

const sortByPop = (events) => {
  if (events.length === 0) return [];

  return events.sort((event1, event2) =>
    event1.attendees.length < event2.attendees.length
      ? 1
      : event1.attendees.length > event2.attendees.length
        ? -1
        : 0
  );
};

const sortByRecency = (events => {
  if (events.length === 0) return [];

  return events.sort((event1, event2) =>
    event1.date > event2.date ? 1 : event1.date < event2.date ? -1 : 0)
})

const eventsTonight = async () => {
  results = [];
  const curr = new Date(Date.now());

  const currHour = curr.getHours();
  let max = new Date(curr.getTime());
  max.setHours(6, 0, 0, 0);
  if (currHour >= 6) {
    max.setDate(curr.getDate() + 1);
  }
  const events = await database
    .collection("Events")
    .where("date", "<=", max.getTime())
    .where("date", ">", curr.getTime())
    .get();
  if (events.empty) {
    return [];
  }
  events.forEach((doc) => {
    results.push(doc.data());
  });
  return results
};

const filterTags = (events, tags) => {
  results = []
  events.forEach((event) => {
    let hasAllTags = true;
    tags.forEach((tag) => {
      if (!event.tags.includes(tag))
        hasAllTags = false;
      return
    })
    if (hasAllTags) {
      results.push(event)
    }
  })
  return results
}


const filter = async (req, res) => {
  let events = []
  if (req.body.tonight) {
    events = await eventsTonight()
    if (events == []) {
      res.status(404).json({
        error: "No events found for tonight"
      })
    }
  } else {
    console.log(Date.now())
    const query = await database.collection("Events").where("date", ">", Date.now()).get()
    console.log(query.docs.length)
    query.forEach((event) => {
      events.push(event.data())
    })
  }
  if (req.body.tags && (req.body.tags.length > 0)) {
    events = filterTags(events, req.body.tags)
  }
  if (req.body.recent) {
    events = sortByRecency(events)
  } else {
    events = sortByPop(events)
  }
  res.status(200).json({
    events: events
  })
}

const userRegistered=async(req,res)=>{
  const user=req.params.userid
  const userRef=await database.collection("Users").doc(user).get()
  if(!userRef.exists){
    res.status(404).json({
      error:"user not found"
    })
    return
  }
  const event=req.params.eventid
  const query=await database.collection("Events").doc(event).get()
  if (!query.exists){
    res.status(404).json({
      error:"event not found"
    })
    return
  }
  res.status(200).json({
    registered: query.data().attendees.includes(user)
  })
}

const userOrgRelation=async(req,res)=>{
  const user=req.params.userid
  const userRef=await database.collection("Users").doc(user).get()
  if(!userRef.exists){
    res.status(404).json({
      error:"user not found"
    })
    return
  }
  const org=req.params.orgid
  const query=await database.collection("Organizations").doc(org).get()
  if (!query.exists){
    res.status(404).json({
      error:"organization not found"
    })
    return
  }
  res.status(200).json({
    following: userRef.data().clubs_following.includes(org),
    member: userRef.data().organizations.includes(org)
  })
}

module.exports = {
  filterTags,
  sortByPop,
  eventsTonight,
  filter,
  sortByRecency,
  userRegistered,
  userOrgRelation
};

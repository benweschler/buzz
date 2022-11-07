const { database } = require('../firebase-admin/index');


const createEvent =async (req, res)=> {
console.log('creating event');
const {attendees, capacity, date, description, location, name, organizer, recurring, tags, ticketed} = req.body;
const eventData=req.body;
//check for empty fields
if(!(attendees||capacity||date||description||location||name||organizer||recurring||tags||ticketed))
{
    console.log('missing field');
    return res.status(500).json({
        success: false,
        error: 'One or more fields are missing'
    });
}
database.collection('Events').add(eventData).then(() => {
    res.status(200).json({
      success: true  
    })
}).catch((error) => {
    res.status(500).json({
        success: false,
        error: 'Failed to create event'
    })
});
};

const readEvent=async (req, res)=>{
const {id} = req.params;
const eventRef = database.collection('Events').doc(id);
const eventDoc = await eventRef.get();
if(!orgDoc.exists) 
{
    console.log('event not found')
    res.status(404).json({
        success: false,
        error: 'Event not found'
    });
}
else{
    res.status(200).json(eventDoc.data());
}
};

const updateEvent=async (req, res)=>{
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);
    eventRef.update(req.body).then(() => {
        res.json({
            success: true
        })
    }).catch((error) => {
        res.status(404).json({
            success: false,
            error: 'Event could not be found'
        })
    })
};

const deleteEvent=async (req, res)=>{
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);
    const eventDoc = eventRef.get();
    eventRef.delete().then(() => {
        res.json({
            success: true
        })
    }).catch((error) =>
    res.status(404).json({
        success: false,
        error: 'Event could not be found'
    })
    )
};

module.exports=
{
createEvent,
readEvent,
updateEvent,
deleteEvent,
};
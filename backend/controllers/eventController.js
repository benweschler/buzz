const { database } = require('../firebase-admin/index');


const createEvent = async (req, res)=> {
    const {attendees, capacity, date, description, location, name, organizer, recurring, tags, ticketed} = req.body;
    const eventData=req.body;
    //check for empty fields
    if(!(attendees||capacity||date||description||location||name||organizer||recurring||tags||ticketed))
    {
        return res.status(400).json({
            error: 'One or more fields are missing'
        });
    }
    database.collection('Events').add(eventData).then((docRef) => {
        console.log('TEST TEST')
        res.status(200).json({
            id: docRef.id
        })
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    });
};

const readEvent = async (req, res) => {
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);
    const eventDoc = await eventRef.get();
    if(!eventDoc.exists) {
        res.status(404).json({
            error: 'Document does not exist'
        });
    }
    else {
        res.status(200).json(eventDoc.data());
    }
};

const updateEvent = async (req, res)=>{
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);
    eventRef.update(req.body).then(() => {
        res.json({
            id: id
        })
    }).catch((error) => {
        res.status(404).json({
            error: 'Event could not be updated'
        })
    })
};

const deleteEvent = async (req, res)=>{
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);

    eventRef.get().then((eventDoc) => {
        if (eventDoc.exists) {
            eventRef.delete().then(() => {
                res.json({
                    id: id
                })
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        } else {
            res.status(404).json({
                success: false,
                error: 'Event could not be found'
            })
        }
    })
};

module.exports = {
    createEvent,
    readEvent,
    updateEvent,
    deleteEvent,
};
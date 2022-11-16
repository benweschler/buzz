const { database } = require('../firebase-admin/index');
const { INITIAL_EVENT_KEYS } = require('../constants/eventConstants.js');


const createEvent = async (req, res)=> {

    // Event needs capacity, date ,description, location, title, organizer, recurring, tags, and ticketed
    let containsAllElements = true;
    INITIAL_EVENT_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            containsAllElements = false;
        }
    })

    //check for empty fields
    if (!containsAllElements) {
        return res.status(400).json({
            error: 'One or more fields are missing'
        });
    } else {
        database.collection('Events').add({
            ...req.body,
            "attendees": [],
        }).then((docRef) => {
            console.log('Created event document with id: ' + docRef.id);
            res.status(200).json({
                id: docRef.id
            })
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        });
    }
};

const readEvent = async (req, res) => {
    const {id} = req.params;

    database.collection('Events').doc(id).get().then((doc) => {
        if (doc.exists) {
            res.status(200).json(doc.data());
        } else {
            res.status(404).json({
                error: 'Document does not exist'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const updateEvent = async (req, res)=>{
    const {id} = req.params;
    database.collection('Events').doc(id).update(req.body).then(() => {
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
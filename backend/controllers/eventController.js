const admin = require('firebase-admin');
const { database, storage } = require('../firebase-admin/index');
const { INITIAL_EVENT_KEYS } = require('../constants/eventConstants.js');
const { updateTags } = require("./utilityController");
const axios = require('axios');
const { v4 } = require('uuid');


const createEvent = async (req, res) => {

    // Event needs capacity, date ,description, location, title, organization, recurring, tags, and ticketed
    let missingFields = [];
    INITIAL_EVENT_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            containsAllElements = false;
            missingFields.push(element);
        }
    })

    //check for empty fields
    if (missingFields.length !== 0) {
        return res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields
        });
    } else {
        database.collection('Events').add({
            ...req.body,
            "date": admin.firestore.Timestamp.now(),
            "attendees": [],
            "has_ended": false
        }).then((docRef) => {
            console.log('Created event document with id: ' + docRef.id);
            updateTags([],req.body.tags, docRef.id);
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

const updateEvent = async (req, res) => {
    const {id} = req.params;
    const eventRef = await database.collection('Events').doc(id).get();
        if (!eventRef.exists)
        {
            res.status(404).json({
                error: "Event not found"
            })
            return;
        }
    const oldTags = eventRef.data().tags
    database.collection('Events').doc(id).update(req.body).then(() => {
        if(req.body.tags)
        {
            updateTags(oldTags, req.body.tags, id);
        }
        res.status(200).json({
            id: id
        })
    }).catch((error) => {
        res.status(500).json({
            error: 'Event could not be updated'
        })
    })
};

const deleteEvent = async (req, res) => {
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

const uploadEventImage = async (req, res) => {
    if (req.body.id == undefined || req.file == undefined) {
        res.status(400).json({
            error: 'One or more fields are missing'
        })
    } else {

        const bucket = storage.bucket();
        const fullPath = `EventImages/${v4()}`;
        const bucketFile = bucket.file(fullPath);

        await bucketFile.save(req.file.buffer, {
            contentType: req.file.mimetype,
            gzip: true
        });

        const [url] = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '01-01-2030'
        });
        
        axios.patch(`http://localhost:4000/api/events/${req.body.id}`, {
            image: url
        }).then(() => {
            res.status(200).json({
                url: url
            })
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        })
    }
}

/* lastDoc can't be passed to the front-end and sent to the back-end to start pagination from that doc
    because it will be passed in the response as a JSON instead of an object that can utilize Firestore
    functions. lastDoc has to be stored in the back-end, but the front-end can reset the lastDoc by
    using the resetPagination function
*/
let lastDoc = null;

const paginateEvents = async (req, res) => {
    // Need last document from the previous pagination and number to limit by

    const PAGINATE_KEYS = ["limit"];

    let missingFields = [];
    PAGINATE_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            missingFields.push(element);
        }
    })

    if (missingFields.length !== 0) {
        res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields
        })
    } else {
        let lastDoc = 0;
        let lastDate = 0;
        // startAfter() needs a query snapshot of the document
        if (req.body.id) {
            let docExists = true
            await database.collection('Events').doc(req.body.id).get().then((snapshot) => {
                if (snapshot.exists) {
                    lastDate = snapshot.data().date;
                } else {
                    docExists = false
                    console.log('Document ID does not exist; pagination will send most recent documents.')
                }
            })
            if (docExists) {
                await database.collection('Events').where("date", "==", lastDate).get().then((snapshot) => {
                    lastDoc = snapshot.docs[0];
                })
            }
        }

        if (!lastDoc) {
            database.collection('Events').orderBy('date', 'desc').limit(req.body.limit).get().then((snapshot) => {
                let queryArray = [];
                snapshot.forEach((doc) => {
                    queryArray.push(doc.data());
                })
                var lastVisible = snapshot.docs[snapshot.docs.length - 1];
                lastDoc = lastVisible;
                res.status(200).json({
                    documents: queryArray
                })
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        } else {
            database.collection('Events').orderBy('date', 'desc').limit(req.body.limit)
            .startAfter(lastDoc).get().then((snapshot) => {
                //console.log('snapshot')
                let queryArray = [];
                snapshot.forEach((doc) => {
                    queryArray.push(doc.data());
                })
                var lastVisible = snapshot.docs[snapshot.docs.length - 1];
                //console.log(lastVisible);
                lastDoc = lastVisible;
                res.status(200).json({
                    documents: queryArray
                })
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        }
    }
}

module.exports = {
    createEvent,
    readEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
    paginateEvents
};
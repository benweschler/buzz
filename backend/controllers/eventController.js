const admin = require('firebase-admin');
const { database, storage } = require('../firebase-admin/index');
const { INITIAL_EVENT_KEYS } = require('../constants/eventConstants.js');
const { FieldValue } = require('@google-cloud/firestore');
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

    const fileUndefined = (req.file == undefined);
    if ((missingFields.length !== 0) || (fileUndefined)) {
        return res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields,
            file_undefined: fileUndefined
        });
    } else {
        if (req.body.tags.length == 0) {
            res.status(400).json({
                error: 'Tags are missing'
            })
        } else {
            const tagString = req.body.tags;
            delete req.body.tags;

            const eventRef = database.collection('Events').doc();
            const orgRef = database.collection('Organizations').doc(req.body.organization);
            const orgDoc = await orgRef.get();
            if (!orgDoc.exists) {
                res.status(400).json({
                    error: 'Organization not found'
                })
            } else {
                // Parse non-string and non-array values

                // Parse capacity
                let capacityNum = 0;
                if (parseInt(req.body.capacity) !== NaN) {
                    capacityNum = parseInt(req.body.capacity);
                }

                // Parse bool
                let ticketedBool = false;
                if (req.body.capacity == "true") {
                    ticketedBool = true;
                }

                // Parse date
                let dateNum = 0;
                if (parseInt(req.body.date) !== NaN) {
                    dateNum = parseInt(req.body.date);
                }

                // Parse Price
                let priceNum = 0;
                if (parseInt(req.body.price) !== NaN) {
                    priceNum = parseInt(req.body.price);
                }

                const orgName = orgDoc.data().name;

                await eventRef.set({
                    "capacity": capacityNum,
                    "description": req.body.description,
                    "location": req.body.location,
                    "title": req.body.title,
                    "organization": req.body.organization,
                    "organization_name": orgName,
                    "ticketed": ticketedBool,
                    "date": dateNum,
                    "price": priceNum,
                    "attendees": [],
                    "has_ended": false,
                    "id": eventRef.id
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                });

                await orgRef.update({
                    events: FieldValue.arrayUnion(eventRef.id)
                })
    
                console.log('Created event document with id: ' + eventRef.id);
    
                // Parse the tagString
                const tagsArray = tagString.split(" ");
                tagsArray.forEach((element, index) => {
                    tagsArray[index] = element.trim();
                })
    
                updateTags([],tagsArray, eventRef.id);
    
                database.collection('Events').doc(eventRef.id).update({
                    "tags": tagsArray
                });
    
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
    
                await eventRef.update({
                    image: url
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                })
    
                res.status(200).json({
                    id: eventRef.id,
                    url: url
                })
            }
        }
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

    if ((Object.keys(req.body).length == 0) && (req.file == null)) {
        res.status(404).json({
            error: 'No keys have been entered'
        })
        return;
    }

    let tagsUpdated = false;
    if (req.body.tags && (req.body.tags.length > 0)) {
        tagsUpdated = true;
    }
    const oldTags = eventRef.data().tags
    const tagString = req.body.tags;
    delete req.body.tags;
    if (Object.keys(req.body).length !== 0) {
        await database.collection('Events').doc(id).update(req.body).catch((error) => {
            res.status(500).json({
                error: error
            })
        })
    }

    if(tagsUpdated)
    {
        const tagsArray = tagString.split(" ");
        tagsArray.forEach((element, index) => {
            tagsArray[index] = element.trim();
        })

        updateTags(oldTags, tagsArray, id);

        database.collection('Events').doc(id).update({
            "tags": tagsArray
        });
    }

    if (req.file == undefined) {
        res.status(200).json({
            id: id
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

        await database.collection('Events').doc(id).update({
            image: url
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        })

        res.status(200).json({
            id: id,
            url: url
        })
    }
};

const deleteEvent = async (req, res) => {
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);

    eventRef.get().then((eventDoc) => {
        if (eventDoc.exists) {
            eventRef.delete().then(() => {
                res.status(200).json({
                    id: id
                })
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        } else {
            res.status(400).json({
                error: 'Event could not be found'
            })
        }
    })
};

const endEvent = async(req, res) => {
    const {id} = req.params;
    const eventRef = database.collection('Events').doc(id);

    eventRef.get().then((eventDoc) => {
        if (eventDoc.exists) {
            eventRef.update({
                has_ended: true
            }).then(() => {
                res.status(200).json({
                    id: id
                })
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        } else {
            res.status(400).json({
                error: 'Event could not be found'
            })
        }
    })
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
    paginateEvents,
    endEvent
};
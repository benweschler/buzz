const { database, storage } = require('../firebase-admin/index');
const { INITIAL_ORGANIZER_KEYS, UPLOAD_KEYS } = require('../constants/organizerConstants.js');
const axios = require('axios');
const { v4 } = require('uuid');

const createOrganizer = async (req, res) => {
    
    // The request needs a description, members, and name
    let containsAllElements = true;
    let missingFields = [];
    INITIAL_ORGANIZER_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            containsAllElements = false;
            missingFields.push(element);
        }
    })

    if (!containsAllElements) {
        res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields
        })
    } else {
        database.collection('Organizers').add({
            ...req.body,
            "events": [],
            "followers": [],
            "image": ""
        }).then((docRef) => {
            console.log('Created organizer document with id: ' + docRef.id);
            res.status(200).json({
                id: docRef.id
            })
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        });
    }
}

const readOrganizer = async (req, res)=>{
    const {id} = req.params;
    
    database.collection('Organizers').doc(id).get().then((doc) => {
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

const updateOrganizer = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);

    orgRef.get().then((orgDoc) => {
        if (orgDoc.exists) {
            orgRef.update(req.body).then(() => {
                res.status(200).json({
                    id: id
                })
            })
        } else {
            res.status(404).json({
                error: 'Organizer could not be found'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const deleteOrganizer = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    
    orgRef.get().then((orgDoc) => {
        if (orgDoc.exists) {
            orgRef.delete().then(() => {
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
                error: 'Organizer does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const getAllOrganizerEvents = async (req, res) => {
    const {id} = req.body;
    console.log(id);

    let eventsArr = [];
    database.collection('Events').where("organizer", "==", id).orderBy('date').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            //eventsJSON[doc.id] = doc.data();
            eventsArr.push(doc.data());
        });
        res.status(200).json({
            events_array: eventsArr
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}

const uploadOrganizerImage = async (req, res) => {
    if (req.body.id == undefined || req.file == undefined) {
        res.status(400).json({
            error: 'One or more fields are missing'
        })
    } else {

        const bucket = storage.bucket();
        const fullPath = `OrganizationImages/${v4()}`;
        const bucketFile = bucket.file(fullPath);

        await bucketFile.save(req.file.buffer, {
            contentType: req.file.mimetype,
            gzip: true
        });

        const [url] = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '01-01-2030'
        });

        axios.patch(`http://localhost:4000/api/organizers/${req.body.id}`, {
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

module.exports = {
    createOrganizer,
    readOrganizer,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
    uploadOrganizerImage
};
const { database, storage } = require('../firebase-admin/index');
const { INITIAL_ORGANIZATION_KEYS, UPLOAD_KEYS } = require('../constants/organizationConstants.js');
const axios = require('axios');
const { v4 } = require('uuid');

const createOrganization = async (req, res) => {
    
    // The request needs a description, members, and name
    let missingFields = [];
    INITIAL_ORGANIZATION_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            missingFields.push(element);
        }
    })

    const fileUndefined = (req.file == undefined)
    if ((missingFields.length !== 0) || (fileUndefined)) {
        res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields,
            file_undefined: fileUndefined
        })
    } else {
        // Have to check the database if there is the same name in the organization

        let alreadyInDatabase = false;
        const organizationsCollectionRef = database.collection('Organizations');

        await organizationsCollectionRef.where('name', '==', req.body.name).get().then((snapshot) => {
            if (snapshot.docs.length > 0) {
                alreadyInDatabase = true;
                res.status(400).json({
                    error: 'Organization with the same name is already in database'
                })
            }
        }).catch((error) => {
            // To prevent the 200 status header being set after this is sent to the client
            alreadyInDatabase = true;
            res.status(500).json({
                error: error
            })
        })

        // If not, then add the organization
        if (!alreadyInDatabase) {
            const docRef = database.collection('Organizations').doc();
            await docRef.set({
                ...req.body,
                "members": [],
                "events": [],
                "followers": [],
                "image": "",
                "id": docRef.id
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            });

            console.log('Created organization document with id: ' + docRef.id);

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

            await database.collection('Organizations').doc(docRef.id).update({
                image: url
            }).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })

            res.status(200).json({
                id: docRef.id,
                url: url
            })
        }
    }
}

const readOrganization = async (req, res)=>{
    const {id} = req.params;
    
    database.collection('Organizations').doc(id).get().then((doc) => {
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

const readOrganizationByName = async (req, res) => {
    const name = req.query.name;

    const organizationsCollectionRef = database.collection('Organizations');

    organizationsCollectionRef.where('name', '==', name).get().then((snapshot) => {
        var docData = [];
        snapshot.forEach(doc => {
            docData.push(doc.data());
        })
        res.status(200).json(docData);
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })

}

const updateOrganization = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizations').doc(id);

    if ((Object.keys(req.body).length == 0) && (req.file == undefined)) {
        res.status(400).json({
            error: "No keys have been entered"
        })
    } else {
        const orgDoc = await orgRef.get().catch((error) => {
            res.status(500).json({
                error: error
            })
        })

        if (orgDoc.exists) {
            if (Object.keys(req.body).length !== 0) {
                await orgRef.update(req.body).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                })
            }

            if (req.file == undefined) {
                res.status(200).json({
                    id: id
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
    
                await orgRef.update({
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
        } else {
            res.status(404).json({
                error: 'Document does not exist'
            })
        }
    }
};

const deleteOrganization = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizations').doc(id);
    
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
                error: 'Organization does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const getAllOrganizationEvents = async (req, res) => {
    const {id} = req.body;
    console.log(id);

    const organizationRef = database.collection('Users').doc(id).get();

    if (!organizationRef.exists) {
        res.status(400).json({
            error: 'Organization does not exist'
        })
    } else {
        let eventsArr = [];
        database.collection('Events').where("organization", "==", id).orderBy('date', 'desc').get().then((snapshot) => {
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
}

const getAllActiveEvents =async(req, res)=>{
    const {id} = req.body;
    console.log(id);
    let eventsArr = [];
    if(id=="")
    {
        res.status(400).json({
            error: "did not pass an organization ID"
        })
    }
    const org=await database.collection('Organizations').doc(id).get()
        if(!org.exists){
        res.status(404).json({
            error:"organization not found"
        })
        return
    }
    database.collection('Events').where("organization", "==", id).where("has_ended", "==", false).orderBy('date').get().then((snapshot) => {
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

module.exports = {
    createOrganization,
    readOrganization,
    readOrganizationByName,
    updateOrganization,
    deleteOrganization,
    getAllOrganizationEvents,
    getAllActiveEvents
};
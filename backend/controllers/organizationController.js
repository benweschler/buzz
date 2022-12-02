const { database, storage } = require('../firebase-admin/index');
const { INITIAL_ORGANIZATION_KEYS, UPLOAD_KEYS } = require('../constants/organizationConstants.js');
const sortByRecency=require("./utilityController")
const axios = require('axios');
const { v4 } = require('uuid');
const { FieldValue } = require('@google-cloud/firestore');

const createOrganization = async (req, res) => {
    
    // The request needs a description, members, and name
    let missingFields = [];
    INITIAL_ORGANIZATION_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            missingFields.push(element);
        }
    })

    const fileUndefined = (req.file == undefined)
    if (missingFields.length !== 0 || fileUndefined) {
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
                return;
            }
        }).catch((error) => {
            // To prevent the 200 status header being set after this is sent to the client
            alreadyInDatabase = true;
            res.status(500).json({
                error: error
            })
            return;
        })

        // If not, then add the organization

        if (!alreadyInDatabase) {
            let organizationID = "";
            let member = req.body.member;

            const userRef = await database.collection('Users').doc(member).get()
            if (userRef.exists) {
                delete req.body.member;
                let organizationMembers = []
                organizationMembers.push(member);
                await database.collection('Organizations').add({
                    ...req.body,
                    "events": [],
                    "followers": [],
                    "members": organizationMembers,
                    "image": ""
                }).then((docRef) => {
                    console.log('Created organization document with id: ' + docRef.id);
                    organizationID = docRef.id;
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                    return;
                });

                await database.collection('Users').doc(member).update({
                    organizations: FieldValue.arrayUnion(organizationID)
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                    return;
                })
    
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
    
                await database.collection('Organizations').doc(organizationID).update({
                    image: url
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    })
                    return;
                })
    
                res.status(200).json({
                    id: organizationID
                })
            } else {
                res.status(400).json({
                    error: 'User does not exist'
                })
            }
        }
    }
}

const readOrganization = async (req, res)=>{
    const {id} = req.params;
    
    database.collection('Organizations').doc(id).get().then(async (doc) => {
        if (doc.exists) {
            events=[]
            const eventRef=await database.collection('Events').where("organization", "==", id).where("date", ">", Date.now()).orderBy('date').get()
            if(!eventRef.empty){
                eventRef.forEach(event=>{
                    events.push(event.data())
                })
            }
            const org ={...doc.data(),"events": events}
            res.status(200).json(org);
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
  const organizationRef = database.collection('Organizations').doc(id);
  if ((Object.keys(req.body).length == 0) && (req.file == undefined)) {
    res.status(400).json({
      error: "No keys have been entered"
    })
  } else {
    const organizationDoc = await organizationRef.get().catch((error) => {
      res.status(500).json({
        error: error
      })
    })

    if (organizationDoc.exists) {
      if (Object.keys(req.body).length !== 0) {
        await organizationRef.update(req.body).catch((error) => {
          res.status(500).json({
            error: error
          })
        });
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

        await organizationRef.update({
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
    const {id} = params.id;
    console.log(id);

    let eventsArr = [];
    database.collection('Events').where("organization", "==", id).orderBy('date').get().then((snapshot) => {
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

const getAllActiveEvents =async(req, res)=>{
    const {id} = req.params;
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
    database.collection('Events').where("organization", "==", id).where("date", ">", Date.now()).orderBy('date').get().then((snapshot) => {
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

const uploadOrganizationImage = async (req, res) => {
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

        axios.patch(`http://localhost:${process.env.PORT}/api/organizations/${req.body.id}`, {
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
    createOrganization,
    readOrganization,
    readOrganizationByName,
    updateOrganization,
    deleteOrganization,
    getAllOrganizationEvents,
    getAllActiveEvents,
    uploadOrganizationImage
};
// For database requests/responses we have to use firebase-admin since it
// those requests/responses have to communicate with the server. For
// authentication we have to use the normal firebase client. Then, we use
// firebase-admin to generate a token for the user
const { database, storage } = require('../firebase-admin/index');
const { auth: clientAuth } = require('../../src/firebase/index');
const { auth: adminAuth } = require('../firebase-admin/index');
const { signInWithEmailAndPassword } = require('firebase/auth');
const axios = require('axios');
const { v4 } = require('uuid');

const { INITIAL_USER_KEYS } = require('../constants/userConstants.js');

// When designing basic functionality for CRUD operations, I used
// https://firebase.google.com/docs/firestore/manage-data/add-data
// and looked at the NodeJS reference

// Firestore Functions

const createUser = async (req, res) => {
    // req.body is the extra JSON information that gets sent to the server

    // The request needs a qrcode, email, password, and major
    let missingFields = [];
    INITIAL_USER_KEYS.forEach((element) => {
        if (!Object.keys(req.body).includes(element)) {
            missingFields.push(element);
        }
    })

    if (missingFields.length !== 0) {
        res.status(400).json({
            error: 'One or more fields are missing',
            missing_fields: missingFields
        });
    } else {
        const email = req.body.email;
        const password = req.body.password;

        adminAuth.createUser({
            email: email,
            password: password
        }).then((record) => {
            // Don't want the password to be included in the document
            delete req.body.password;

            database.collection('Users').doc(record.uid).set({
                ...req.body,
                "clubs_following": [],
                "events_registered": [],
                "interests": [],
                "organizations": []
            }).then(() => {
                console.log('Created user document with id: ' + record.uid);
                res.status(200).json({
                    id: record.uid
                })
            }).catch((error) => {
                console.log('Error creating user document in Firestore');
                res.status(500).json({
                    error: error
                })
            })
        }).catch((error) => {
            console.log('Error creating user in auth');
            res.status(500).json({
                error: error
            })
        })
    }
}

const readUser = async (req, res) => {
    // req.params is the extra information at the end of the URL
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    
    userRef.get().then((userDoc) => {
        if (userDoc.exists) {
            res.status(200).json(userDoc.data())
        } else {
            res.status(404).json({
                error: 'Document does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}


// Using GET on http://localhost:4000/api/users?email=jaredvel25@gmail.com
// gets the document with jaredvel25@gmail.com as the email
const readUserByEmail = async (req, res) => {
    const email = req.query.email;

    const usersCollectionRef = database.collection('Users');
    // Queries the user collection and tries to match the email with the ID passed in
    // Should only output one document

    // This is using Firestore Query, which is not dependent on the amount of data in the collection
    usersCollectionRef.where('email', '==', email).get().then((snapshot) => {
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

const updateUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);

    userRef.get().then((userDoc) => {
        if (userDoc.exists) {
            userRef.update(req.body).then(() => {
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
                error: 'Document does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    
    userRef.get().then((userDoc) => {
        if (userDoc.exists) {
            userRef.delete().then(() => {
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
                error: 'Document does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}

// Signs in user and generates a token
const authenticateUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Use Firebase v9 syntax to sign the user in with email and password,
        // since firebase on the client side is v9
        signInWithEmailAndPassword(clientAuth, email, password)
            .then((userCredential) => {
                // Get the token that firebase generates and return it
                res.status(200).json({
                    token: userCredential.user.stsTokenManager.accessToken
                })
            }).catch((error) => {
                res.status(400).json({
                    error: error
                })
            })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const tokenTest = async (req, res) => {
    const {token} = req.body;
    adminAuth.verifyIdToken(token).then((claims) => {
        console.log('Token verified!');
        res.status(200).json({
            "success": true
        })
    }).catch((error) => {
        res.status(400).json({
            "success": false
        })
    })
}

const uploadUserImage = async (req, res) => {
    if (req.body.id == undefined || req.file == undefined) {
        res.status(400).json({
            error: 'One or more fields are missing'
        })
    } else {

        const bucket = storage.bucket();
        const fullPath = `UserImages/${v4()}`;
        const bucketFile = bucket.file(fullPath);

        await bucketFile.save(req.file.buffer, {
            contentType: req.file.mimetype,
            gzip: true
        });

        const [url] = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '01-01-2030'
        });

        axios.patch(`http://localhost:4000/api/users/${req.body.id}`, {
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
    createUser,
    readUser,
    readUserByEmail,
    updateUser,
    deleteUser,
    authenticateUser,
    tokenTest,
    uploadUserImage
}
// For database requests/responses we have to use firebase-admin since it
// those requests/responses have to communicate with the server. For
// authentication we have to use the normal firebase client. Then, we use
// firebase-admin to generate a token for the user
const { database } = require('../firebase-admin/index');
const { auth: clientAuth } = require('../../src/firebase/index');
const { auth: adminAuth } = require('../firebase-admin/index');
const { signInWithEmailAndPassword } = require('firebase/auth');
const axios = require('axios');

// When designing basic functionality for CRUD operations, I used
// https://firebase.google.com/docs/firestore/manage-data/add-data
// and looked at the NodeJS reference

// Firestore Functions

const createUser = async (req, res) => {
    // req.body is the extra JSON information that gets sent to the server
    const { qrcode, clubs_following, email, 
        events_registered, interests, major, name, username, id } = req.body;
    //console.log(req.body)
    if (!qrcode || !clubs_following || !email || !events_registered
        || !interests || !major || !name || !username || !id) {
            //console.log('Missing field');
            res.status(400).json({
                error: 'One or more fields are missing'
            })
    } else {
        console.log('Going to post');
        const userData = req.body;
        database.collection('Users').doc(id).set(userData).then((docRef) => {
            res.status(200).json({
                id: id
            })
        }).catch((error) => {
            res.status(500).json({
                error: error
            })
        });
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
    const userDocSnapshot = await usersCollectionRef.where('email', '==', email).get();
    usersCollectionRef.where('email', '==', email).get().then((snapshot) => {
        if (userDocSnapshot.empty) {
            res.status(404).json({
                error: 'Email does not exist in database'
            })
        } else {
            var docData = {};
            userDocSnapshot.forEach(doc => {
                docData = doc.data();
            })
            res.status(200).json(docData);
        }
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

// Authentication Functions
const createUserInAuth = async (req, res) => {
    const {email, password} = req.body;
    console.log('Creating user in auth')

    adminAuth.createUser({
        email: email,
        password: password
    }).then((record) => {
        console.log('Setting custom claims')
        adminAuth.setCustomUserClaims(record.uid, {
            organizer: false
        })
        res.status(200).json({
            id: record.uid,
        })
    }).catch((error) => {
        console.log(error)
        res.status(400).json({
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
        if (claims.organizer === false) {
            console.log('Current user is not an organizer');
        } else {
            console.log('Current user is an organizer');
        }
        res.status(200).json({
            "success": true
        })
    }).catch((error) => {
        res.status(400).json({
            "success": false
        })
    })
}

const createUserAndSignup = async (req, res) => {
    const { qrcode, clubs_following, email, 
        events_registered, interests, major, name, username, password } = req.body;
    if (!qrcode || !clubs_following || !email || !events_registered
        || !interests || !major || !name || !username) {
            res.status(400).json({
                error: 'One or more fields are missing'
            })
    } else {
        axios({
            method: 'post',
            url: 'http://localhost:4000/api/users/signup',
            data: {
                email: email,
                password: password
            }
        }).then((signupRes) => {
            axios({
                method: 'post',
                url: 'http://localhost:4000/api/users/',
                data: {
                    qrcode: qrcode,
                    clubs_following: clubs_following,
                    email: email,
                    events_registered: events_registered,
                    interests: interests,
                    major: major,
                    name: name,
                    username: username,
                    id: signupRes.data.id
                }
            }).catch((error) => {
                res.status(404).json({
                    "error": "test1"
                })
            })
        }).catch((error) => {
            res.status(404).json({
                "error": error
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
    createUserInAuth,
    authenticateUser,
    tokenTest,
    createUserAndSignup,
}
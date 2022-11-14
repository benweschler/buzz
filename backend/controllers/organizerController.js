const { database } = require('../firebase-admin/index');
const { auth: clientAuth } = require('../../src/firebase/index');
const { auth: adminAuth } = require('../firebase-admin/index');
const { signInWithEmailAndPassword } = require('firebase/auth');
const axios = require('axios');

const createOrganizer = async (req, res) => {
    // req.body is the extra JSON information that gets sent to the server
    const { description, events, followers, name, email, id } = req.body;
    //console.log(req.body)
    if (!description || !events || !followers || !name || !email || !id) {
            //console.log('Missing field');
            res.status(400).json({
                error: 'One or more fields are missing'
            })
    } else {
        const userData = req.body;
        database.collection('Organizers').doc(id).set(userData).then((docRef) => {
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

const readOrganizer = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    const orgDoc = await orgRef.get();
    
    if (!orgDoc.exists) {
        res.status(404).json({
            error: 'Document does not exist'
        })
    } else {
        res.status(200).json(orgDoc.data())
    }
};

const readOrganizerByEmail = async (req, res)=>{
    const email = req.query.email;

    const orgsCollectionRef = database.collection('Organizers');
    const orgDocSnapshot = await orgsCollectionRef.where('email', '==', email).get();
    
    if (orgDocSnapshot.empty) {
        res.status(404).json({
            error: 'No organization found with this email'
        })
    } else {
        var docData = {};
        orgDocSnapshot.forEach(doc => {
            docData = doc.data();
        })
        res.status(200).json(docData);
    }
};

const updateOrganizer=async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);

    orgRef.get().then((orgDoc) => {
        if (orgDoc.exists) {
            orgRef.update(req.body).then(() => {
                res.json({
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

// Authentication Functions
const createOrganizerInAuth = async (req, res) => {
    const {email, password} = req.body;
    console.log('Creating organizer in auth')

    adminAuth.createUser({
        email: email,
        password: password
    }).then((record) => {
        console.log('Setting custom claims');
        adminAuth.setCustomUserClaims(record.uid, {
            organizer: true
        })
        console.log('Custom claims set');
        res.status(200).json({
            id: record.uid,
        })
    }).catch((error) => {
        //console.log('error in org auth')
        res.status(400).json({
            error: error
        })
    })
}

// Signs in organizer and generates a token
const authenticateOrganizer = async (req, res) => {
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

const createOrganizerAndSignup = async (req, res) => {
    const { description, events, followers, name, email, password } = req.body;
    if (!description || !events || !followers || !name || !email || !password) {
            res.status(400).json({
                error: 'One or more fields are missing'
            })
    } else {
        axios({
            method: 'post',
            url: 'http://localhost:4000/api/organizers/signup',
            data: {
                email: email,
                password: password
            }
        }).then((signupRes) => {
            axios({
                method: 'post',
                url: 'http://localhost:4000/api/organizers/',
                data: {
                    description: description,
                    events: events,
                    followers: followers,
                    name: name,
                    email: email,
                    id: signupRes.data.id
                }
            }).then(() => {
                res.status(200).json({
                    success: true
                });
            }).catch((error) => {
                console.log(error);
                res.status(403).json({
                    error: error
                });
            })
        }).catch((error) => {
            res.status(405).json(error);
        })
    }
}

module.exports = {
    createOrganizer,
    readOrganizer,
    readOrganizerByEmail,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
    createOrganizerInAuth,
    authenticateOrganizer,
    tokenTest,
    createOrganizerAndSignup
};
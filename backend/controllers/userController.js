const { database } = require('../firebase-admin/index');


// When designing basic functionality for CRUD operations, I used
// https://firebase.google.com/docs/firestore/manage-data/add-data
// and looked at the NodeJS reference

const createUser = async (req, res) => {
    // req.body is the extra JSON information that gets sent to the server
    const { qrcode, clubs_following, email, 
        events_registered, interests, major, name, username } = req.body;
    const userData = req.body;
    database.collection('Users').add(userData).then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((error) => {
        res.status(500).json({
            success: false,
            error: error
        })
    });
}

const readUser = async (req, res) => {
    // req.params is the extra information at the end of the URL
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
        console.log('Test Test Test');
        res.status(404).json({
            success: false
        })
    } else {
        res.status(200).json(userDoc.data())
    }
}


// Using GET on http://localhost:4000/api/users?email=jaredvel25@gmail.com
// gets the document with jaredvel25@gmail.com as the email
const readUserByEmail = async (req, res) => {
    const email = req.query.email;

    const usersCollectionRef = database.collection('Users');
    // Queries the user collection and tries to match the email with the ID passed in
    // Should only output one document
    const userDocSnapshot = await usersCollectionRef.where('email', '==', email).get();
    
    if (userDocSnapshot.empty) {
        res.status(500).json({
            success: false
        })
    } else {
        var docData = {};
        userDocSnapshot.forEach(doc => {
            docData = doc.data();
        })
        res.status(200).json(docData);
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    userRef.update(req.body).then(() => {
        res.json({
            success: true
        })
    }).catch((error) => {
        res.status(404).json({
            success: false,
            error: error
        })
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    const userDoc = userRef.get();

    /*if (!userDoc.exists) {
        res.json({
            success: false,
        })
    } else {
        userRef.delete().then(() => {
            res.json({
                success: true
            })
        })
    }*/
    userRef.delete().then(() => {
        res.json({
            success: true
        })
    })
}

module.exports = {
    createUser,
    readUser,
    readUserByEmail,
    updateUser,
    deleteUser
}
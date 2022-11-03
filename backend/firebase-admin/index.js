// Firebase Imports
const admin = require('firebase-admin');
const authorization = require('firebase-admin/auth');
const firestore = require('firebase-admin/firestore');

// Initializing Admin SDK with environment variables:
// https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/

var serviceAccount = require('./.firebase/service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://buzz-8222d.firebaseio.com"
})

var database = admin.firestore();

module.exports = {
    database
}
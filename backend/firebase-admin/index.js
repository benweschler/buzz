// Firebase Imports
const admin = require('firebase-admin');

// Initializing Admin SDK with environment variables:
// https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/

var serviceAccount = require('./.firebase/service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://buzz-8222d.firebaseio.com"
})

const database = admin.firestore();
const auth = admin.auth();

module.exports = {
    admin,
    database,
    auth,
}
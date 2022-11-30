// Firebase Imports
const admin = require('firebase-admin');
const {getStorage} = require('firebase-admin/storage');

// Initializing Admin SDK with environment variables:
// https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/

var serviceAccount = require('./.firebase/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://buzz-8222d.firebaseio.com",
  storageBucket: "gs://buzz-8222d.appspot.com"
})

const database = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
  admin,
  database,
  auth,
  storage
}
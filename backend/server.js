require('dotenv').config()

// Firebase Imports
const admin = require('firebase-admin');

// Express Setup
const express = require('express');
const app = express();

// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// Initializing Admin SDK with environment variables:
// https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
})

// https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc

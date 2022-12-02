// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app')
//import { getAuth } from 'firebase/auth'
const {getAuth} = require('firebase/auth');
const {getStorage} = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "buzz-8222d.firebaseapp.com",
  projectId: "buzz-8222d",
  storageBucket: "buzz-8222d.appspot.com",
  messagingSenderId: "1019444561354",
  appId: "1:1019444561354:web:acd373bb778fd3300b3b33",
};

// Initialize Firebase ClientApplication
const app = initializeApp(firebaseConfig);

// Initialize Firebase Client Services
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = {
  auth,
  storage
}
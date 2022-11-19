// Firebase Imports
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

// Multer Imports
const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');

// Initializing Admin SDK with environment variables:
// https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/

var serviceAccount = require('./.firebase/service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://buzz-8222d.firebaseio.com",
    storageBucket: "gs://buzz-8222d.appspot.com"
})

// Initialize Multer with Firebase Admin
const multer = Multer({
    storage: FirebaseStorage({
        bucketName: "buzz-8222d.appspot.com",
        /*credentials: {
            clientEmail: 'firebase-adminsdk-5ju0d@buzz-8222d.iam.gserviceaccount.com',
            privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnQXfadNYkRabS\nty/L5JZRgQHcISzWSXPII7M19PFrjJ7TLvLDZV82gf7pxao/SrOSMbFyghRRRoyi\nlm3Sz+yOWZyW7e963PkJmm0+/HcmgrTGceoOCJCoRrkqnTP5uxjbyYOGAavdElYc\nv1DLEclbkm8j4V6hlrCMW98ZIuGUOMnBcY/vuLljK5coFZYDh0PHGPVtIqGXrO6u\nPA8bun7Rhy4vVLdLLAQsog78e4sgI/1KWEsFUbgDT+CoZttds8WlwFj7bBty7Oq8\nALVBDDC176cJ6Ycda+6WVKXFwFjLgAxE510Vq/S3nb3km1tiMherT6LwygnDyaX5\nAdymKyxXAgMBAAECggEAMVkrLD0Jy8TzPjvHcfC9e0nFizYMnSMp8rS51SMysglY\n+TVick1wJMyBMmdcXnVDe1CHKyJ/LSXUK8qXl7o6cRu2jH+ih404O2GhdxKVczrg\nbKbCqKZVTBkl3BFq+vV9laek0z6d/0nAN5YpF+llEEwp15vQyHuGFruqnSeCCDGp\nAue/GMGjJvbb6Xgp6/5TbPQo2Mjeweg+/umfBR2JmGCmIOWSvWGkzRkOqvThH0b9\nSafudU1XyufeskuEMQ7psKzHhz9HOC8HRL684gbaHllQdIycs97Pv9O5eYJEraEX\nAblZqBRYAZC/2eEJVg2HofKT35pyHoTUTJ+AQOmP5QKBgQDWWjyRMkuYEIhpLKFB\nibnZV8VuQhDu/7YaJe+eDy74pe4sste08fY0ysnIl9jPZgoX41Ap9q8DmiqzXsN7\nVLZYA/yqcS4C26T6KcQ2/lMC2PK+cyer2NbCwlZNTwGq/SIeXaIaL6mObMr7bDVw\n6babpdImVxkVH5vx2/mdD8sKWwKBgQDHwKrll48dznNLhx7W1xiJPtR18Co+GR6H\nfcj9iKRZ+Oos4kFl13zBsI3GQCeHNihfUFY7esNJARv+gTT6626ZsNnSWgqJUROq\nU7UZyOZPSHAxCtMT0BPUQxqdKLWv4SFD9EDk2su2wTmLGitlTzlg7X3HxSvTZ53P\nGifEFimutQKBgGzdladUuQn5U56/GQNVNLvLFS3DhiAsZUtwevt20K9ebtHq3x06\nSoZTfBpR7L6hH300aPF3JToaIZfKCFRqGNYo6DmUk/7FmUuozMv1bSmkD91kVQC1\nd5Wg5/4Jo1o5iAuOGJdeH6qDXLBHK/k16hWxKUNptwaAcE5tH6CCdefDAoGAKRLx\nESzM/PAKvSkXqk2oefA1d9relM5NfMbcoWWLhgStAnWzxOE+ggVv4agneKImQxMd\n6DUiGszjmL2wyzfGEkxPPfXN3NaTGJ8FyjuJQBxBFZSIOra6nRb/TfmlAnlkgbij\n72seIIIy9ut2qOpVfhzXlFBy5pGT3ZYfPy7fe1ECgYA3Ur+2NPsleCCWca/zjsE2\nN2/Cj/n+ycGFk3uG5yMLrtbxIu99lZfZmfjPfIBDoflBZyOBuQuCR/HyYH6oLOP+\nh/Ocf3lnW5UFhTWaCRPBqJKAfd8UULKjB9138u1Z6NQXbwQLnPjb+PJbg4Mtge/W\nc0SjE0S5RSnmz4fRz1/Ebg==\n-----END PRIVATE KEY-----\n',
            projectId: 'buzz-8222d',
        }*/
        credentials: admin.credential.cert(serviceAccount),
    })
});

const database = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
    admin,
    database,
    auth,
    storage,
    multer
}
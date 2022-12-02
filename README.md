# Getting started with Buzz

Buzz is a platform for hosting and joining events created by organizations. Users can sign up for Buzz, sign up for events, create organizations, and create events for those organizations.

This web application was created using React on the front-end and NodeJS with Express on the back-end. Firebase is used as a database for the application, an authenticator for signing up or signing in users, and storage for user-submitted images.

# Running Buzz

To run Buzz, you must first install all of the dependencies by using the command `npm install`.
After doing so, the server can be started by running the command `node ./backend/server.js` from the buzz directory.
Lastly, execute the command `npm start` to initialize the react project.

# Features
## Authentication
The user by default is taken to the signin page where they can login or register if they are a first time user. When registering, the user needs to provide an email, name, major, and profile picture. The form data collected from the user is passed to firebase storage and authentication, where a user document is created for the user.
## Feed
The first thing a user sees after logging on is the Feed page. The feed has 3 options to search

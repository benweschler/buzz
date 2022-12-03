# Getting started with Buzz

Buzz is a platform for hosting and joining events created by organizations. Users can sign up for Buzz, sign up for events, create organizations, and create events for those organizations.

This web application was created using React on the front-end and NodeJS with Express on the back-end. Firebase is used as a database for the application, an authenticator for signing up or signing in users, and storage for user-submitted images.

# Running Buzz

To run Buzz, you must first install all of the dependencies by using the command `npm install`.
After doing so, the server can be started by running the command `node ./backend/server.js` from the buzz directory.
Lastly, execute the command `npm start` to initialize the react project. For the back-end functionality to work, you need three files. You first need the .env file, which stores the environment variables that the back-end needs to read. In addition, you need the configuration information for Firebase, which would be stored under /src/firebase/index.js. Finally, you need the service account information for the Firebase Admin SDK, which would be stored at /backend/firebase-admin/.firebase/service-account.json.

# Features
## Authentication
The user by default is taken to the signin page where they can login or register if they are a first time user. When registering, the user needs to provide an email, name, major, and profile picture. The form data collected from the user is passed to firebase storage and authentication, where a user document is created for the user.
## Feed
The first thing a user sees after logging on is the Feed page. The feed has two options to search from: the tags specified and the "What's Buzzin' Tonight" button. If you specify the tags, Buzz will show all events that have those tags. If you press "What's Buzzin' Tonight," Buzz will get the most popular events that are happening from when the user pressed that button to 6:00 am at then next day.

From each event card on the screen, the user can select the event page or the organization page. On the navigation bar at the top, the user can generate their QR Code, go to the feed, go to the user page, and sign out.

## User Page
A user has their own page to display their name, email, major, profile picture, tickets to events you followed, and organizations that you are a member of. A user can create their own organization by submitting its name, description, and image. From here, the user can access their organization on their organizations tab on their page.s

## Organization Page
An organization has its own page that stores its name, image, description, and events. A user can follow an organization, which means the organization's events will show up on their feed, or a user can join the organization as a member. If a user is a member of an organization, which means they have privileges inside that organization that allows them to create and edit events for that organization. If a user joins as a member, a button will show that will allow the user to create an event, and the user will be sent to a create event form to create that event.

## Event Page
An event has its own page that stores its name, date, image, number of attendees, max number of attendees, location, price, and organization. A user can RSVP an event, and they will be added to the attendees list. If a user is a member of an organization, then the QR scanner will show. A user can show their QR code, valid for 60 seconds, and verify themselves to add themselves to the attended list.

## QR Codes
A user stores a secret key on their document in Firebase. This secret key can be used to generate a hash from an HMAC SHA-1 algorithm. This hash will be stored on the QR Code that the user can access at the top of the page. A QR code is generated every second, and it is valid for 60 seconds only. The user is able to show the QR Code to the organization, and on the event page, a member of that organization who is hosting that event can pull up a QR Scanner. The QR Scanner will scan the user's QR Code, and if it is valid, it will add the users to the attended list for the event.

# Backend
The backend is powered by Firebase Services; specifically, Buzz uses Firebase Authentication, Firestore Database, and Firebase Storage. These three features are intertwined within our application. To communicate with Firebase, we used NodeJS and Express to create our own server and made API requests with Axios there.

## Users
When a user signs up on the front-end, the user is first created in Firebase Authentication, and then the Authentication UID is passed to create a document of data for that user using the same UID. Each user stores their clubs_following, email, events_registered, id, image URL, major, name, organizations, and secret key fields. When a user is created, the profile picture that the user uploaded is uploaded onto Firebase Storage, and the download URL of that image is put back onto the user document to make referencing the image easy for the front-end.

## Organizations
When an organization is created on the front-end, Firebase will store the description, organization events, followers of that organization, the id, the image URL, members of that organization, and the name. For organization events, followers, and members, Firebase stores this information as an array of document IDs to reference.

## Events
When an event is created on the front-end, Firebase will store the description, event ID, the image URL, the location, the organization and its name, the price, the tags, whether the event is ticketed, and the title of the event.
// For database requests/responses we have to use firebase-admin since it
// those requests/responses have to communicate with the server. For
// authentication we have to use the normal firebase client. Then, we use
// firebase-admin to generate a token for the user
const {database, storage} = require('../firebase-admin/index');
const {auth: clientAuth} = require('../../src/firebase/index');
const {auth: adminAuth} = require('../firebase-admin/index');
const {FieldValue} = require('@google-cloud/firestore');
const {signInWithEmailAndPassword} = require('firebase/auth');
const jsSHA = require('jssha');
const {v4} = require('uuid');
const crypto = require('crypto');
const {sortByRecency} = require('./utilityController');
const {INITIAL_USER_KEYS} = require('../constants/userConstants.js');
const {WINDOW_TIME} = require('../constants/utilityConstants');

// When designing basic functionality for CRUD operations, I used
// https://firebase.google.com/docs/firestore/manage-data/add-data
// and looked at the NodeJS reference

// Firestore Functions

const createUser = async (req, res) => {
  // req.body is the extra JSON information that gets sent to the server

  // The request needs a qrcode, email, password, and major
  let missingFields = [];
  INITIAL_USER_KEYS.forEach((element) => {
    if (!Object.keys(req.body).includes(element)) {
      missingFields.push(element);
    }
  })

  const fileUndefined = (req.file == undefined)
  if ((missingFields.length !== 0) || (fileUndefined)) {
    res.status(400).json({
      error: 'One or more fields are missing',
      missing_fields: missingFields,
      file_undefined: fileUndefined
    });
  } else {
    const email = req.body.email;
    const password = req.body.password;

    let userCreated = false;
    let recordObj = {}
    await adminAuth.createUser({
      email: email,
      password: password
    }).then((record) => {
      userCreated = true;
      recordObj = record
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })

    if (userCreated) {
      // Don't want the password to be included in the document
      delete req.body.password;

      // Create the shared secret
      const secret = new Uint8Array(20);
      crypto.getRandomValues(secret);

      await database.collection('Users').doc(recordObj.uid).set({
        ...req.body,
        "clubs_following": [],
        "events_registered": [],
        "interests": [],
        "organizations": [],
        "secret": secret,
        "id": recordObj.uid
      }).catch((error) => {
        console.log('Error creating user document in Firestore');
        res.status(500).json({
          error: error
        })
      })

      if (userCreated) {
          // Don't want the password to be included in the document
          delete req.body.password;

          // Create the shared secret
          const secret = new Uint8Array(20);
          crypto.getRandomValues(secret);

          await database.collection('Users').doc(recordObj.uid).set({
              ...req.body,
              "clubs_following": [],
              "events_registered": [],
              "organizations": [],
              "secret": secret,
              "id": recordObj.uid
          }).catch((error) => {
              console.log('Error creating user document in Firestore');
              res.status(500).json({
                  error: error
              })
          })

          console.log('Created user document with id: ' + recordObj.uid);

          const bucket = storage.bucket();
          const fullPath = `UserImages/${v4()}`;
          const bucketFile = bucket.file(fullPath);

          await bucketFile.save(req.file.buffer, {
            contentType: req.file.mimetype,
            gzip: true
          });

          const [url] = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '01-01-2030'
          });

          await database.collection('Users').doc(recordObj.uid).update({
            image: url
          }).catch((error) => {
            res.status(500).json({
              error: error
            })
          })


          // Sign in the user and return the token to the front-end
          const userCredential = await signInWithEmailAndPassword(clientAuth, email, password).catch((error) => {
            res.status(400).json({
              error: error
            })
          })

          let userRef = await database.collection('Users').doc(recordObj.uid).get()
          let userData = userRef.data();

          res.status(200).json({
            id: recordObj.uid,
            user_data: userData,
            token: userCredential.user.stsTokenManager.accessToken
          })
      }
    }
  }
}

const readUser = async (req, res) => {
  // req.params is the extra information at the end of the URL
  const {id} = req.params;
  const userRef = database.collection('Users').doc(id);

  userRef.get().then(async (userDoc) => {
    if (userDoc.exists) {
      events = []
      for (let i = 0; i < userDoc.data().events_registered.length; i++) {
        eventRef = database.collection('Events').doc(userDoc.data().events_registered[i])
        await eventRef.get().then((event) => {
          events.push(event.data())
        })
      }
      const user = {...userDoc.data(), events_registered: events}

      const hmac = new jsSHA("SHA-1", "HEX");
      hmac.setHMACKey(userDoc.data().secret, "UINT8ARRAY");

      const hmacString = hmac.getHMAC('HEX');

      res.status(200).json(user)
    } else {
      res.status(404).json({
        error: 'Document does not exist'
      })
    }
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
}


// Using GET on http://localhost:4000/api/users?email=jaredvel25@gmail.com
// gets the document with jaredvel25@gmail.com as the email
const readUserByEmail = async (req, res) => {
  const email = req.query.email;

  const usersCollectionRef = database.collection('Users');
  // Queries the user collection and tries to match the email with the ID passed in
  // Should only output one document

  // This is using Firestore Query, which is not dependent on the amount of data in the collection
  usersCollectionRef.where('email', '==', email).get().then((snapshot) => {
    var docData = [];
    snapshot.forEach(doc => {
      docData.push(doc.data());
    })
    res.status(200).json(docData);
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
}

const updateUser = async (req, res) => {
  const {id} = req.params;
  const userRef = database.collection('Users').doc(id);
  if ((Object.keys(req.body).length == 0) && (req.file == undefined)) {
    res.status(400).json({
      error: "No keys have been entered"
    })
  } else {
    const userDoc = await userRef.get().catch((error) => {
      res.status(500).json({
        error: error
      })
    })

    if (userDoc.exists) {
      if (Object.keys(req.body).length !== 0) {
        await userRef.update(req.body).catch((error) => {
          res.status(500).json({
            error: error
          })
        });
      }

      if (req.file == undefined) {
        res.status(200).json({
          id: id
        })
      } else {
        const bucket = storage.bucket();
        const fullPath = `UserImages/${v4()}`;
        const bucketFile = bucket.file(fullPath);

        await bucketFile.save(req.file.buffer, {
          contentType: req.file.mimetype,
          gzip: true
        });

        const [url] = await bucketFile.getSignedUrl({
          action: 'read',
          expires: '01-01-2030'
        });

        await userRef.update({
          image: url
        }).catch((error) => {
          res.status(500).json({
            error: error
          })
        })

        res.status(200).json({
          id: id,
          url: url
        })
      }
    } else {
      res.status(404).json({
        error: 'Document does not exist'
      })
    }
  }
}

const deleteUser = async (req, res) => {
  const {id} = req.params;
  const userRef = database.collection('Users').doc(id);

  userRef.get().then((userDoc) => {
    if (userDoc.exists) {
      userRef.delete().then(() => {
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
        error: 'Document does not exist'
      })
    }
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
}

// Signs in user and generates a token
const authenticateUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Use Firebase v9 syntax to sign the user in with email and password,
    // since firebase on the client side is v9
    signInWithEmailAndPassword(clientAuth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        database.collection('Users').doc(userCredential.user.uid).get().then((userDoc) => {
          let userData = {};

          if (userDoc.exists) {
            // Get the token that firebase generates and return it
            userData = userDoc.data();
            res.status(200).json({
              success: true,
              token: userCredential.user.stsTokenManager.accessToken,
              user_data: userData
            })
          } else {
            res.status(500).json({
              success: false,
              error: 'User not found'
            })
          }

        })
      }).catch((error) => {
      res.status(400).json({
        success: false,
        error: error
      })
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    })
  }
}

const verifyToken = async (req, res) => {
  if (!Object.keys(req.params).includes("token")) {
    res.status(400).json({
      error: "Token is missing"
    })
  } else {
    const {token} = req.params;

    const checkRevoked = true;
    adminAuth.verifyIdToken(token, checkRevoked).then((claims) => {
      console.log('Token verified!');
      res.status(200).json({
        "success": true
      })
    }).catch((error) => {
      console.log('Token not verified!');
      res.status(200).json({
        "success": false
      })
    })
  }
}

const revokeToken = async (req, res) => {
  if (!Object.keys(req.params).includes("id")) {
    res.status(400).json({
      error: "User ID is missing"
    })
  } else {
    const {id} = req.params;
    adminAuth.revokeRefreshTokens(id).then(() => {
      res.status(200).json({
        id: id
      })
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  }
}

const addUserToOrg = async (req, res) => {
  if (!req.body.user || !req.body.organization) {
    res.status(400).json({
      error: "Cannot add user to organization because one or both are missing from body of request"
    })
    return
  }

  let userRef = database.collection('Users').doc(req.body.user)
  let orgRef = database.collection('Organizations').doc(req.body.organization)
  userRef.get().then((userDoc) => {
    if (!userDoc.exists) {
      res.status(404).json({
        error: "User not found"
      })
      return
    } else {
      orgRef.get().then((orgDoc) => {
        if (!orgDoc.exists) {
          res.status(404).json({
            error: "Organization not found"
          })
          return
        }
        let member=true
        let organizations=userDoc.data().organizations
        if(orgDoc.data().members.includes(req.body.user)){
            if(orgDoc.data().members.length==1){
                res.status(400).json({
                    error:"User is the last member of organization and they cannot be removed"
                })
                return
            }
            orgRef.update({
                "members": FieldValue.arrayRemove(req.body.user)
              })
              userRef.update({
                "organizations": FieldValue.arrayRemove(req.body.organization)
              }) 
            member=false
            organizations=organizations.filter(x=>x!=req.body.organization)
        }
        else {
          orgRef.update({
            "members": FieldValue.arrayUnion(req.body.user)
          })
          userRef.update({
            "organizations": FieldValue.arrayUnion(req.body.organization)
          })
          member=true
          organizations.push(req.body.organization)
        }
          res.status(200).json({
            "member": member,
            "organizations": organizations
          })
      })//.catch((error) => {
    //     res.status(500).json({
    //       error: error
    //     })
    //   })
    }
  })//.catch((error) => {
//     res.status(500).json({
//       error: error
//     })
//   })
}

const addUserToEvent = async (req, res) => {
  if (!req.body.user || !req.body.event) {
    res.status(400).json({
      error: "Cannot add user to event because one or both are missing from body of request"
    })
    return
  }

  let userRef = database.collection('Users').doc(req.body.user)
  let eventRef = database.collection('Events').doc(req.body.event)
  userRef.get().then((userDoc) => {
    if (!userDoc.exists) {
      res.status(404).json({
        error: "User not found"
      })
      return
    } else {
      eventRef.get().then((eventDoc) => {
        if (!eventDoc.exists) {
          res.status(404).json({
            error: "Event not found"
          })
          return
        } else {
          const capacity = eventDoc.data().capacity
          const attendees = eventDoc.data().attendees.length
          if (eventDoc.data < Date.now()) {
            res.status(500).json({
              error: "Event has already ended"
            })
            return
          }
          let events=userDoc.data().events_registered
          let registered=false
          let newAttending=0
          if(!eventDoc.data().attendees.includes(req.body.user)){
            if (attendees >= capacity) {
                res.status(500).json({
                  error: "Event at capacity"
                })
                return
              }
          eventRef.update({
            "attendees": FieldValue.arrayUnion(req.body.user)
          })
          newAttending=eventDoc.data().attending+1
          eventRef.update({
            "attending": newAttending
          })
          userRef.update({
            "events_registered": FieldValue.arrayUnion(req.body.event)
          })
          registered=true
          events.push(req.body.event)
        }
        else{
            eventRef.update({
                "attendees": FieldValue.arrayRemove(req.body.user)
            })
            newAttending=eventDoc.data().attending-1
            eventRef.update({
                "attending": newAttending
              })
            userRef.update({
                "events_registered": FieldValue.arrayRemove(req.body.event)
            })
           registered=false
           events=events.filter(x=>x!=req.body.event)
        }
          res.status(200).json({
            "registered": registered,
            "events_registered": events
          })
        }
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    }
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
}

const followOrg = async (req, res) => {
  if (!req.body.user || !req.body.organization) {
    res.status(400).json({
      error: "Cannot follow/unfollow organization because organization or user are missing from body of request"
    })
    return
  }

  let userRef = database.collection('Users').doc(req.body.user)
  let orgRef = database.collection('Organizations').doc(req.body.organization)
  userRef.get().then((userDoc) => {
    if (!userDoc.exists) {
      res.status(404).json({
        error: "User not found"
      })
      return
    } else {
      orgRef.get().then((orgDoc) => {
        if (!orgDoc.exists) {
          res.status(404).json({
            error: "Organization not found"
          })
          return
        }
       let following=false
       let orgs=userDoc.data().clubs_following
        if(orgDoc.data().followers.includes(req.body.user)){
            orgRef.update({
                "followers": FieldValue.arrayRemove(req.body.user)
              })
              userRef.update({
                "clubs_following": FieldValue.arrayRemove(req.body.organization)
              })
              following=false
              orgs=orgs.filter(x=>x!=req.body.organization)
        }
         else {
          orgRef.update({
            "followers": FieldValue.arrayUnion(req.body.user)
          })
          userRef.update({
            "clubs_following": FieldValue.arrayUnion(req.body.organization)
          })
          following=true
          orgs.push(req.body.organization)
        }
          res.status(200).json({
            "following": following,
            "clubs_following": orgs
          })
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    }
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
}

const getFeed = async (req, res) => {
  const {id} = req.params
  database.collection('Users').doc(id).get().then(async (user) => {
    if (!user.exists) {
      res.status(404).json({
        error: "user not found"
      })
      return
    }
    const orgNum = user.data().clubs_following.length
    if (orgNum == 0) {
      res.status(400).json({
        error: "user is not following any clubs"
      })
      return
    }
    const orgs = user.data().clubs_following
    let results = []
    for (let i = 0; i < orgNum; i++) {
      await database.collection('Organizations').doc(orgs[i]).get().then(async (org) => {
        if (org.exists) {
          for (let i = 0; i < org.data().events.length; i++) {
            let event = await database.collection('Events').doc(org.data().events[i]).get()
            if (event.exists && (event.data().date > Date.now()))
              results.push(event.data())
          }
        }
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    }
    results = sortByRecency(results)
    res.status(200).json({
      events: results
    })
  })
}

const validateUserOTP = async (req, res) => {
  const {id, hmac} = req.params;

  const userRef = database.collection('Users').doc(id);

  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    res.status(400).json({
      error: "User does not exist"
    })
  } else {
    const secret = new Uint8Array(userDoc.data().secret);

    const currentTime = Date.now() / 1000;

    const sequenceValue = Math.floor(currentTime)

    let hmacWindowArray = [];
    for (let i = 0; i < WINDOW_TIME; i++) {
      // Get current time in seconds
      // Date.now() returns milliseconds
      const iteratedTime = sequenceValue - i;

      // Do HMAC-SHA1 with the secret
      const hmac = new jsSHA("SHA-1", "HEX");
      hmac.setHMACKey(secret, "UINT8ARRAY");
      hmac.update(iteratedTime.toString(16));

      const hmacString = hmac.getHMAC('HEX');
      hmacWindowArray.push(hmacString);
    }

    if (hmacWindowArray.includes(hmac)) {
      res.status(200).json({
        authentication: true
      })
    } else {
      res.status(200).json({
        authentication: false
      })
    }
  }
}

module.exports = {
  createUser,
  readUser,
  readUserByEmail,
  updateUser,
  deleteUser,
  authenticateUser,
  verifyToken,
  revokeToken,
  addUserToOrg,
  validateUserOTP,
  addUserToEvent,
  followOrg,
  getFeed
}
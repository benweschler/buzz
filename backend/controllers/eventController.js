const admin = require('firebase-admin');
const {database, storage} = require('../firebase-admin/index');
const {INITIAL_EVENT_KEYS} = require('../constants/eventConstants.js');
const {FieldValue} = require('@google-cloud/firestore');
const {v4} = require('uuid');


const createEvent = async (req, res) => {

  // Event needs capacity, date ,description, location, title, organization, recurring, tags, and ticketed
  let missingFields = [];
  INITIAL_EVENT_KEYS.forEach((element) => {
    if (!Object.keys(req.body).includes(element)) {
      containsAllElements = false;
      missingFields.push(element);
    }
  })

  const fileUndefined = (req.file == undefined);
  if ((missingFields.length !== 0) || (fileUndefined)) {
    return res.status(400).json({
      error: 'One or more fields are missing',
      missing_fields: missingFields,
      file_undefined: fileUndefined
    });
  } else {
    if (req.body.tags.length == 0) {
      res.status(400).json({
        error: 'Tags are missing'
      })
    } else {
      const tagString = req.body.tags;
      delete req.body.tags;

      const eventRef = database.collection('Events').doc();
      const orgRef = database.collection('Organizations').doc(req.body.organization);
      const orgDoc = await orgRef.get();
      if (!orgDoc.exists) {
        res.status(400).json({
          error: 'Organization not found'
        })
      } else {
        // Parse non-string and non-array values

        // Parse capacity
        let capacityNum = 0;
        if (!isNaN(parseInt(req.body.capacity))) {
          capacityNum = parseInt(req.body.capacity);
        }

        // Parse bool
        let ticketedBool = false;
        if (req.body.ticketed == "true") {
          ticketedBool = true;
        }

        // Parse date
        let dateNum = 0;
        if (!isNaN(parseInt(req.body.date))) {
            if(parseInt(req.body.date)<=Date.now())
            {
                res.status(400).json({
                    error: "date must be in the future"
                })
                return
            }
          dateNum = parseInt(req.body.date);
        }

        // Parse Price
        let priceNum = 0;
        if (!isNaN(parseInt(req.body.price))) {
          priceNum = parseInt(req.body.price);
        }

        const orgName = orgDoc.data().name;

        await eventRef.set({
          "capacity": capacityNum,
          "attending": 0,
          "attended":[],
          "description": req.body.description,
          "location": req.body.location,
          "title": req.body.title,
          "organization": req.body.organization,
          "organization_name": orgName,
          "ticketed": ticketedBool,
          "date": dateNum,
          "price": priceNum,
          "attendees": [],
          "id": eventRef.id
        }).catch((error) => {
          res.status(500).json({
            error: error
          })
        });

        await orgRef.update({
          events: FieldValue.arrayUnion(eventRef.id)
        })

        console.log('Created event document with id: ' + eventRef.id);

        // Parse the tagString
        const tagsArray = tagString.split(" ");
        tagsArray.forEach((element, index) => {
          tagsArray[index] = element.trim();
        })

        database.collection('Events').doc(eventRef.id).update({
          "tags": tagsArray
        });

        const bucket = storage.bucket();
        const fullPath = `EventImages/${v4()}`;
        const bucketFile = bucket.file(fullPath);

        await bucketFile.save(req.file.buffer, {
          contentType: req.file.mimetype,
          gzip: true
        });

        const [url] = await bucketFile.getSignedUrl({
          action: 'read',
          expires: '01-01-2030'
        });

        await eventRef.update({
          image: url
        }).catch((error) => {
          res.status(500).json({
            error: error
          })
        })

        res.status(200).json({
          id: eventRef.id,
          url: url
        })
      }
    }
  }
};

const readEvent = async (req, res) => {
  const {id} = req.params;

  database.collection('Events').doc(id).get().then((doc) => {
    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(404).json({
        error: 'Document does not exist'
      });
    }
  }).catch((error) => {
    res.status(500).json({
      error: error
    })
  })
};

const updateEvent = async (req, res) => {
  const {id} = req.params;
  const eventRef = await database.collection('Events').doc(id).get();
  if (!eventRef.exists) {
    res.status(404).json({
      error: "Event not found"
    })
    return;
  }

  if ((Object.keys(req.body).length == 0) && (req.file == null)) {
    res.status(404).json({
      error: 'No keys have been entered'
    })
    return;
  }

  let tagsUpdated = false;
  if (req.body.tags && (req.body.tags.length > 0)) {
    tagsUpdated = true;
  }
  
  const tagString = req.body.tags;
  delete req.body.tags;
  if (Object.keys(req.body).length !== 0) {
    await database.collection('Events').doc(id).update(req.body).catch((error) => {
      res.status(500).json({
        error: error
      })
      return;
    })
  }

  // Parse non-string variables
  // Parse capacity
  let capacityNum = 0;
  if (req.body.capacity && !isNaN(parseInt(req.body.capacity))) {
    capacityNum = parseInt(req.body.capacity);
    await database.collection('Events').doc(id).update({
      capacity: capacityNum
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  }

  // Parse bool
  if (req.body.ticketed && (req.body.ticketed == "true")) {
    await database.collection('Events').doc(id).update({
      ticketed: true
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  } else if (req.body.ticketed == "false") {
    await database.collection('Events').doc(id).update({
      ticketed: false
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  }

  // Parse date
  let dateNum = 0;
  if (req.body.date && !isNaN(parseInt(req.body.date))) {
    dateNum = parseInt(req.body.date);
    await database.collection('Events').doc(id).update({
      date: dateNum
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  }

  // Parse Price
  let priceNum = 0;
  if (req.body.price && !isNaN(parseInt(req.body.price))) {
    priceNum = parseInt(req.body.price);
    await database.collection('Events').doc(id).update({
      price: priceNum
    }).catch((error) => {
      res.status(500).json({
        error: error
      })
    })
  }

  if (tagsUpdated) {
    const tagsArray = tagString.split(" ");
    tagsArray.forEach((element, index) => {
      tagsArray[index] = element.trim();
    })

    database.collection('Events').doc(id).update({
      "tags": tagsArray
    });
  }

  if (req.file == undefined) {
    res.status(200).json({
      id: id
    })
  } else {
    const bucket = storage.bucket();
    const fullPath = `EventImages/${v4()}`;
    const bucketFile = bucket.file(fullPath);

    await bucketFile.save(req.file.buffer, {
      contentType: req.file.mimetype,
      gzip: true
    });

    const [url] = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '01-01-2030'
    });

    await database.collection('Events').doc(id).update({
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
};

const deleteEvent = async (req, res) => {
  const {id} = req.params;
  const eventRef = database.collection('Events').doc(id);

  eventRef.get().then((eventDoc) => {
    if (eventDoc.exists) {
      eventRef.delete().then(() => {
        res.status(200).json({
          id: id
        })
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    } else {
      res.status(400).json({
        error: 'Event could not be found'
      })
    }
  })
};

const paginateEvents = async (req, res) => {
  // Need last document from the previous pagination and number to limit by

  const PAGINATE_KEYS = ["limit"];

  let missingFields = [];
  PAGINATE_KEYS.forEach((element) => {
    if (!Object.keys(req.body).includes(element)) {
      missingFields.push(element);
    }
  })

  if (missingFields.length !== 0) {
    res.status(400).json({
      error: 'One or more fields are missing',
      missing_fields: missingFields
    })
  } else {
    const curr = new Date(Date.now())
    let lastDoc = 0;
    let lastDate = 0;
    // startAfter() needs a query snapshot of the document
    if (req.body.id) {
      let docExists = true
      await database.collection('Events').doc(req.body.id).get().then((snapshot) => {
        if (snapshot.exists) {
          lastDate = snapshot.data().date;
        } else {
          docExists = false
          console.log('Document ID does not exist; pagination will send most recent documents.')
        }
      })
      if (docExists) {
        await database.collection('Events').where("date", "==", lastDate).get().then((snapshot) => {
          lastDoc = snapshot.docs[0];
        })
      }
    }

    if (!lastDoc) {
      database.collection('Events').where("date", ">", curr.getTime()).limit(req.body.limit).get().then((snapshot) => {
        let queryArray = [];
        snapshot.forEach((doc) => {
          queryArray.push(doc.data());
        })
        lastDoc = snapshot.docs[snapshot.docs.length - 1];
        res.status(200).json({
          events: queryArray
        })
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    } else {
      database.collection('Events').where("date", ">", curr.getTime()).limit(req.body.limit)
        .startAfter(lastDoc).get().then((snapshot) => {
        //console.log('snapshot')
        let queryArray = [];
        snapshot.forEach((doc) => {
          queryArray.push(doc.data());
        })
        //console.log(lastVisible);
        lastDoc = snapshot.docs[snapshot.docs.length - 1];
        res.status(200).json({
          events: queryArray
        })
      }).catch((error) => {
        res.status(500).json({
          error: error
        })
      })
    }
  }
}

module.exports = {
  createEvent,
  readEvent,
  updateEvent,
  deleteEvent,
  paginateEvents,
};
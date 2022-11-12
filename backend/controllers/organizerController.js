const { database } = require('../firebase-admin/index');


const createOrganizer = async (req, res)=> {
    const { description, events, followers, name, email } = req.body;
    const orgData = req.body;
  //check for empty fields
  if(!description||!events||!followers||!name||!email)
  {
   res.status(500).json({
        error: 'One or more fields are missing'
    });
  }
    database.collection('Organizers').add(orgData).then(() => {
        res.status(200).json({
            id: orgData.id
        })
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    });
};

const readOrganizer = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    const orgDoc = await orgRef.get();
    
    if (!orgDoc.exists) {
        res.status(404).json({
            error: 'Document does not exist'
        })
    } else {
        res.status(200).json(orgDoc.data())
    }
};

const readOrganizerByEmail = async (req, res)=>{
    const email = req.query.email;

    const orgsCollectionRef = database.collection('Organizers');
    const orgDocSnapshot = await orgsCollectionRef.where('email', '==', email).get();
    
    if (orgDocSnapshot.empty) {
        res.status(404).json({
            error: 'No organization found with this email'
        })
    } else {
        var docData = {};
        orgDocSnapshot.forEach(doc => {
            docData = doc.data();
        })
        res.status(200).json(docData);
    }
};

const updateOrganizer=async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);

    orgRef.get().then((orgDoc) => {
        if (orgDoc.exists) {
            orgRef.update(req.body).then(() => {
                res.json({
                    id: id
                })
            })
        } else {
            res.status(404).json({
                error: 'Organizer could not be found'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const deleteOrganizer = async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    
    orgRef.get().then((orgDoc) => {
        if (orgDoc.exists) {
            orgRef.delete().then(() => {
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
                error: 'Organizer does not exist'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
};

const getAllOrganizerEvents = async (req, res) => {
    const {id} = req.body;
    console.log(id);

    let eventsArr = [];
    database.collection('Events').where("organizer", "==", id).orderBy('date').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            //eventsJSON[doc.id] = doc.data();
            eventsArr.push(doc.data());
        });
        res.status(200).json({
            events_array: eventsArr
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}

module.exports = {
    createOrganizer,
    readOrganizer,
    readOrganizerByEmail,
    updateOrganizer,
    deleteOrganizer,
    getAllOrganizerEvents,
};
const { database } = require('../firebase-admin/index');


const createOrganizer =async (req, res)=> {
    const { description, events, followers, name } = req.body;
    const orgData = req.body;
  //check for empty fields
  if(!description||!events||!followers||!name)
  {
   res.status(500).json({
success: false,
error: 'One or more fields are missing'
    });
  }
    database.collection('Organizers').add(orgData).then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((error) => {
        res.status(500).json({
            success: false,
            error: 'Failed to create organizer'
        })
    });
};

const readOrganizer=async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    const orgDoc = await orgRef.get();
    
    if (!orgDoc.exists) {
        console.log('user not found');
        res.status(404).json({
            success: false,
            error: 'User not found'
        })
    } else {
        res.status(200).json(orgDoc.data())
    }
};

const readOrganizerByEmail=async (req, res)=>{
    const email = req.query.email;

    const orgsCollectionRef = database.collection('Organizers');
    const orgDocSnapshot = await usersCollectionRef.where('email', '==', email).get();
    
    if (orgDocSnapshot.empty) {
        res.status(500).json({
            success: false,
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
    orgRef.update(req.body).then(() => {
        res.json({
            success: true
        })
    }).catch((error) => {
        res.status(404).json({
            success: false,
            error: 'Organizer could not be found'
        })
    })
};

const deleteOrganizer=async (req, res)=>{
    const {id} = req.params;
    const orgRef = database.collection('Organizers').doc(id);
    const orgDoc = orgRef.get();
    orgRef.delete().then(() => {
        res.json({
            success: true
        })
    }).catch((error) =>
    res.status(404).json({
        success: false,
        error: 'Event could not be found'
    })
    )
};

module.exports=
{
createOrganizer,
readOrganizer,
readOrganizerByEmail,
updateOrganizer,
deleteOrganizer,
};
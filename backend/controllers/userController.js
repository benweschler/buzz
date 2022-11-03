const { database } = require('../firebase-admin/index');

const createUser = async (req, res) => {
    const { qrcode, clubs_following, email, 
        events_registered, interests, major, name, username } = req.body;
    const userData = req.body;
    database.collection('Users').add(userData).then(() => {
        res.json({
            success: true
        })
    });
}

const readUser = async (req, res) => {
    const {id} = req.params; // ID should be movxQcAX4l78QooYB2W9
    database.collection('Users').doc(id).get().then(result => {
        res.json(result.data())
    })
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    userRef.update(req.body).then(() => {
        res.json({
            success: true
        })
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const userRef = database.collection('Users').doc(id);
    userRef.delete().then(() => {
        res.json({
            success: true
        })
    }).catch((error) => {
        res.json({
            success: false,
            error: error
        })
    })
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}
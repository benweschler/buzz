const { database } = require('../firebase-admin/index');

const createUser = async (req, res) => {
    res.json({
        message: 'Welcome!',
        success: true
    })
}

const readUser = async (req, res) => {
    const {id} = req.params; // ID should be movxQcAX4l78QooYB2W9
    database.collection('Users').doc(id).get().then(result => {
        res.json(result.data())
    })
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}
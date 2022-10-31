const createUser = async (req, res) => {
    const { QRcode, clubs_following, email, 
        events_registered, interests, major, name, username} = req.body;
    
    // IMPLEMENT CHECK TO SEE IF ALL FIELDS ARE POPULATED
}

const readUser = async (req, res) => {

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
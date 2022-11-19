const TAGS=require("../constants/utilityConstants"); //import tags
const { database } = require('../firebase-admin/index'); //import firebase


const filterEvents=async(req, res) =>{
    let tags=req.body.tags;
if(!tags||tags.length==0){
    res.status(400).json({
        error:'No tags found'
    });
}
const eventRef=database.collection('Tags').doc(tags[0]);
eventRef.get().then((tagDoc) => {
    if (tagDoc.exists){
        res.status(200).json(tagDoc.data())}
    else{
        res.status(404.).json({
            error: 'No events found with this tag'
        })
    }
}).catch((error)=>{
    res.status(500).json({
        error: error
    })
});

}

module.exports={
filterEvents
}
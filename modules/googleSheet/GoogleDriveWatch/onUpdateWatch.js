require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const loadAllUsers = require("../loadAllUsers");
const saveAllUsers = require("../saveAllUsers");
const saveDidimdolClass = require("../saveDidimdolClass");
const loadDidimdolClass = require("../loadDidimdolClass");

const filesToWatch = {
    [process.env.GOOGLE_SHEET_ID]: {
        fileId: process.env.GOOGLE_SHEET_ID,
        onchange: async (fileId, sheet)=>{
            console.log("save", fileId);
            await saveAllUsers(fileId, sheet);
            await saveDidimdolClass(fileId, sheet);
        }
    }
}

async function onUpdateWatch(changed, fileId, sheet){
    try{
        if(filesToWatch[fileId]){
            await filesToWatch[fileId].onchange(fileId, sheet);
        }
        return {
            result: {
                changed, fileId
            }
        }
    }
    catch(error){
        console.log(error);
        return {
            error
        }
    }
}

module.exports = onUpdateWatch;
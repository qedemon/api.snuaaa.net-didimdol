require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");

async function getDidimdolClassById(classId){
    try{
        await connect();
        const didimdolClass = await ["lecturer", "assistants", "students"].reduce(
            (result, populate)=>{
                return result.populate({path: populate, select: ["name", "id", "major", "colNo", "attendant"], populate: {path: "QRAuthenticationLogs", populate: "authentication"}});
            },
            DidimdolClass.findById(classId)
        );
        if(!didimdolClass || didimdolClass.hide){
            throw new Error("no class");
        }
        const classInfo = didimdolClass.toObject();
        ["lecturer", "assistants", "students"].forEach(
            (key)=>{
                if(classInfo[key]){
                    classInfo[key].forEach(user=>{delete user.QRAuthenticationLogs});
                }
            }
        )
        return {didimdolClass: classInfo};
    }
    catch(error){
        return {error};
    }
}

module.exports = getDidimdolClassById;
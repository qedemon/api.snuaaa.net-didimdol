require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");
const {request, convertLocalToRemote, createToken} = require("Utility");
const {getNow} = require("modules/time/core");

async function allDidimdolClasses(){
    try{
        await connect();
        const didimdolClasses = await DidimdolClass.find({})
            .populate({path: "lecturer", select: ["name", "id"]})
            .populate({path: "assistants", select: ["name", "id"]})
            .populate({path: "students", select: ["name", "id"]});
            
        return {
            didimdolClasses
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = allDidimdolClasses;
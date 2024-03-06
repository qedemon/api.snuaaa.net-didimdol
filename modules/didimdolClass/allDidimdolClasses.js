require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");

async function allDidimdolClasses(){
    try{
        await connect();
        const didimdolClasses = await DidimdolClass.find({})
            .populate({path: "lecturer", select: ["name", "id", "major", "colNo"]})
            .populate({path: "assistants", select: ["name", "id", "major", "colNo"]})
            .populate({path: "students", select: ["name", "id", "major", "colNo"]});
            
        return {
            didimdolClasses: didimdolClasses.map(didimdolClass=>didimdolClass.toObject())
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = allDidimdolClasses;
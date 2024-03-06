require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");

async function allDidimdolClasses(select=[], populate=["lecturer", "assistants", "students"]){
    try{
        await connect();
        const didimdolClasses = await populate.reduce(
            (result, populate)=>{
                return result.populate({path: populate, select: ["name", "id", "major", "colNo"]});
            },
            DidimdolClass.find({hide: {$ne: true}}).select(select)
        );
            
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
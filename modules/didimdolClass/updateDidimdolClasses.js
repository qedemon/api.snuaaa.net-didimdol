require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");

async function updateDidimdolClasses(data){
    try{
        await connect();
        await DidimdolClass.updateMany({}, {hide: true});
        const didimdolClasses = await Promise.all(
            data.map(
                async(classData)=>{
                    const {title} = classData;
                    return await DidimdolClass.findOneAndUpdate({title}, {...classData, hide: false}, {new: true, upsert: true});
                }
            )
        )
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

module.exports = updateDidimdolClasses;
require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {DidimdolClass} = require("models");

async function updateDidimdolClasses(data){
    try{
        await connect();
        const didimdolClasses = await Promise.all(
            data.map(
                async(classData)=>{
                    const {title} = classData;
                    return await DidimdolClass.findOneAndUpdate({title}, classData, {new: true, upsert: true});
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
const {mongoose: {connect}} = require("Utility");
const {User, DidimdolClass} = require("models");
const {getNow} = require("modules/time/core");

async function updateDidimdolWants(userId, wants){
    try{
        await connect();
        const user = await User.findOne({id: userId});
        if(!user){
            throw new Error(`no user with ID ${userId}`);
        }

        const now = getNow();
        const firstWant = await (
            async (didimdolClassId)=>{
                if(!didimdolClassId){
                    return null;
                }
                return await DidimdolClass.findById(didimdolClassId).populate("wants");
            }
        )((Array.isArray(wants) && wants.length>0)?wants[0]:null);
        const lastWants = (Array.isArray(wants) && wants.length>0)?wants.slice(1):[];

        if(firstWant?._id!=user.didimdolClass.firstWant.didimdolClass){
            if(firstWant && firstWant.wants>=firstWant.maxWant){
                throw new Error("정원 초과");
            }
            user.didimdolClass.firstWant={
                ...user.didimdolClass.firstWant,
                didimdolClass: firstWant?._id??null,
                at: now
            }
        }
        user.didimdolClass.lastWants=lastWants;
        await user.save();

        return {
            updated: user.toObject({virtuals: true})
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = updateDidimdolWants
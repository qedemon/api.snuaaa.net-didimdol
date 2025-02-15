const {mongoose: {connect}} = require("Utility");
const {User} = require("models");
const {getNow} = require("modules/time/core");

async function updateDidimdolWants(userId, wants){
    try{
        await connect();
        const user = await User.findOne({id: userId});
        if(!user){
            throw new Error(`no user with ID ${userId}`);
        }

        const now = getNow();
        const firstWant = (Array.isArray(wants) && wants.length>0)?wants[0]:null;
        const lastWants = (Array.isArray(wants) && wants.length>0)?wants.slice(1):[];

        if(firstWant!=user.didimdolClass.firstWant.didimdolClass){
            user.didimdolClass.firstWant={
                ...user.didimdolClass.firstWant,
                didimdolClass: firstWant,
                at: now
            }
        }

        await user.save();

        return {
            user: user.toObject({virtuals: true})
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = updateDidimdolWants
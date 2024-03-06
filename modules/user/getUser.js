const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getUser(filter){
    try{
        await connect();
        const user = await User.findOne(filter).populate("attendances");
        if(!user){
            throw new Error("no user");
        }
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

module.exports = getUser;
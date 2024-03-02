const {mongoose: {connect}} = require("Utility");
const {Types} = require("mongoose");

const {User} = require("models");

async function getUserBy_id(userId){
    try{
        await connect();
        const user = await User.findById(userId, ["-password"]).populate("attendances");
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

module.exports = getUserBy_id;
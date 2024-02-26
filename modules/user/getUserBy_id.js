const {mongoose: {connect}} = require("Utility");
const {Types} = require("mongoose");

const {User} = require("models");

async function getUserBy_id(userId){
    try{
        await connect();
        const user = await User.findById(userId, ["-password"]);
        return {
            user: user.toObject()
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getUserBy_id;
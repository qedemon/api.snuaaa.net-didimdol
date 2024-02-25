const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getUserBy_id(userId){
    try{
        await connect();
        const user = await User.findById(userId, ["-password"]);
        return {
            user
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getUserBy_id;
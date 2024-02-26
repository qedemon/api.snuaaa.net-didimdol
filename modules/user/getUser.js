const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getUser(filter){
    try{
        await connect();
        const user = await User.findOne(filter);
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

module.exports = getUser;
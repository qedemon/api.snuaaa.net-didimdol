const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function updateUser(userInfo){
    try{
        await connect();
        const {_id, ...userInfoWithoutId} = userInfo
        const user = await User.findByIdAndUpdate(_id, userInfoWithoutId, {upsert: true, new: true});
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

module.exports = updateUser
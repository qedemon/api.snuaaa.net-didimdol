const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function updateUser(userInfo){
    try{
        await connect();
        const {_id, ...userInfoWithout_Id} = userInfo
        const user = await User.findOneAndUpdate({id: userInfo.id}, userInfoWithout_Id, {upsert: true, new: true, select:["-password"]});
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
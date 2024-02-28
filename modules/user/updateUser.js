const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function updateUser(userInfo){
    try{
        await connect();
        const {_id, aaaNo, ...remians} = userInfo;
        const userInfoWithout_Id = /^\d{2}AAA-\d+$/.test(aaaNo)||/^AAA\d{2}-\d+$/.test(aaaNo)?
            {
                aaaNo,
                ...remians
            }:
            remians;
        
        const user = await User.findOneAndUpdate({id: userInfo.id}, userInfoWithout_Id, {upsert: true, new: true, select:["-password"]});
        return {
            user: user
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = updateUser
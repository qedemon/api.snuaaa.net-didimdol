const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function updateUser(userInfo, upsert=false){
    try{
        await connect();
        const {_id, aaaNo, ...remians} = userInfo;
        const userInfoWithout_Id = /^\d{2}AAA-\d+$/.test(aaaNo)||/^AAA\d{2}-\d+$/.test(aaaNo)?
            {
                aaaNo,
                ...remians
            }:
            remians;
        const user = await User.findOneAndUpdate({id: userInfo.id}, userInfoWithout_Id, {upsert, new: true, select:["-password"]});
            /*.populate(
                {
                    path: "attendances",
                    select: ["authenticatedAt", "message"],
                    populate: {
                        path: "authentication",
                        select: ["type", "context"]
                    }
                }
            );*/

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

module.exports = updateUser
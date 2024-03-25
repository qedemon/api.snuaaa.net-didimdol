const lodash = require("lodash");
const {mongoose: {connect}} = require("Utility");
const {QRAuthenticationLog} = require("models");

async function deleteQRLogsFromUser(userId, filter){
    try{
        if(!userId || !filter || Object.keys(filter).length===0){
            throw new Error("invalid parameter");
        }
        await connect();
        const toBeDeleted = lodash.filter(
            (await QRAuthenticationLog.find({id: userId, deleted: {$ne: true}}).populate("authentication")),
            lodash.zipObjectDeep(lodash.keys(filter), lodash.values(filter))
        );
        return {
            deleted: await QRAuthenticationLog.updateMany({_id: {$in: toBeDeleted.map((_id)=>_id)}}, {deleted: true})
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = deleteQRLogsFromUser;
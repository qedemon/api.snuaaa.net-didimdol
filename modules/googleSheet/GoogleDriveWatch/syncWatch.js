const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {GoogleDriveWatch} = require("models");

async function syncWatch(channelId, resourceId){
    try{
        await connect();
        const googleDriveWatch = await GoogleDriveWatch.findById(channelId);
        if(!googleDriveWatch){
            throw new Error("no matched");
        }
        if(googleDriveWatch.expiration<getNow()){
            throw new Error("expired");
        }
        googleDriveWatch.state = "sync";
        googleDriveWatch.resourceId = resourceId;

        const {fileId} = googleDriveWatch;
        return {
            result: {
                sync: await googleDriveWatch.save(),
                delete: await GoogleDriveWatch.deleteMany({_id: {$ne: channelId}, fileId})
            }
        }
    }
    catch(error){
        return {error}
    }
}

module.exports = syncWatch;
require("dotenv").config();
const {mongoose: {connect}, createToken} = require("Utility");
const {GoogleDriveWatch} = require("models");

async function stopWatch(channelId, resourceId, drive){
    try{
        await connect();
        const response = await drive.channels.stop(
            {
                resource: {
                    id: channelId,
                    resourceId,
                }
            }
        );
        return {
            delete: await GoogleDriveWatch.deleteMany({_id: channelId})
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = stopWatch;
require("dotenv").config();
const {mongoose: {connect}, createToken} = require("Utility");
const {GoogleDriveWatch} = require("models");
const path = require("path");

async function createWatch(fileId, drive){
    try{
        await connect();
        const googleDriveWatch = await GoogleDriveWatch.create({fileId});
        const response = await drive.files.watch(
            {
                fileId,
                resource: {
                    id: googleDriveWatch._id,
                    type: "web_hook",
                    address: `https://${path.join(process.env.API_HOST, "googleSheet", "notification")}`,
                    token: createToken(googleDriveWatch),
                    expiration: googleDriveWatch.expiration.getTime()
                }
            }
        )

        return {
            googleDriveWatch
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = createWatch;
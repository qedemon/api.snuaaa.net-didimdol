const request = require("Utility/remoteConnection");
const {convertRemoteToLocal} = require("Utility");

async function remoteAuthorize(token){
    try{
        const {success, CODE, userInfo} = await request.get("api/userinfo", token);
        if(!success){
            throw new Error(CODE);
        }
        return {
            user: convertRemoteToLocal.convertUser(userInfo)
        };
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = remoteAuthorize;
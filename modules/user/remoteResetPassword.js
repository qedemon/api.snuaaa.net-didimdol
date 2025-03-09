const request = require("Utility/remoteConnection");

async function remoteResetPassword(id, name, email){
    try{
        const result = await request.post("api/userinfo/find/pw/", {id, name, email});
        const {success} = result;
        return {
            success
        }
    }
    catch(error){
        return {
            error
        }
    }
}
module.exports = remoteResetPassword;
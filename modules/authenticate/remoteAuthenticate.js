require("dotenv").config();
const request = require("Utility/remoteConnection");
const {convertRemoteToLocal} = require("Utility");

async function remoteAuthenticate(id, password){
    try{
        const token = await (
            async(id, password)=>{
                const loginInfo = await request.post("api/auth/login/", {id, password});
                const {sucess, token, message} = loginInfo;
                if(!sucess){
                    throw new Error(message);
                }
                return token;
            }
        )(id, password);
        const userInfo = await (
            async (token)=>{
                const {success, CODE, userInfo} = await request.get("api/userinfo", token);
                if(!success){
                    throw new Error(CODE);
                }
                return userInfo;
            }
        )(token);
        return {
            userInfo: convertRemoteToLocal.convertUser(userInfo),
            token
        };
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = remoteAuthenticate;
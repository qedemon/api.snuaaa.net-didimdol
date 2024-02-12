require("dotenv").config();
const fetch = require("node-fetch");
const {updateUser} = require("modules/user/core");
const {convertRemoteToLocal} = require("Utility");

const remoteAPIHost = process.env.REMOTE_API_HOST;
async function authorize(token){
    const options = {
        method: "GET",
        mode: "cors",
        chache: "no-chache",
        credentials: "same-origin",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    try{
        const res = await fetch(`${remoteAPIHost}/api/userinfo`, options);
        const {success, CODE, userInfo:remoteUserInfo} = await res.json();
        if(success){
            const {user: userInfo, error} = await updateUser(convertRemoteToLocal.convertUser(remoteUserInfo));
            if(error){
                throw error;
            }

            if(userInfo){
                return {
                    authorized: true,
                    userInfo,
                    origin: "local"
                }
            }
            else{
                return {
                    authorized: true,
                    userInfo: (
                        ({user_id, id, username: name, col_no, major})=>{
                            return {
                                user_id, id, name, col_no, major,
                                isAdmin: false
                            }
                        }
                    )(remoteUserInfo),
                    origin: "remote"
                }
            }
        }
        else{
            throw new Error(CODE);
        }
    }
    catch(error){
        return {
            authorized: false,
            error
        }
    }
}

module.exports = authorize;
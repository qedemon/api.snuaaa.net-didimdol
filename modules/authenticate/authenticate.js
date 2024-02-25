require("dotenv").config();
const fetch = require("node-fetch");
const {updateUser} = require("modules/user/core");
const {convertRemoteToLocal} = require("Utility");

const remoteAPIHost = process.env.REMOTE_API_HOST;

async function authenticate(id, password, isStaff){
    const data = {id, password, autoLogin: true};
    const options = {
        method: "POST",
        mode: "cors",
        chache: "no-chache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    }
    try{
        const res = await fetch(`${remoteAPIHost}/api/auth/login/`, options);
        const {sucess, userInfo: authenticatedUserInfo, token, message} = await res.json();
        if(sucess){
            const remoteUserInfo = await (
                async (token)=>{
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
                    const res = await fetch(`${remoteAPIHost}/api/userinfo`, options);
                    const {success, CODE, userInfo} = await res.json();
                    if(!success){
                        throw new Error(CODE);
                    }
                    return userInfo;
                }
            )(token)
            const userInfo = await (
                async (remoteUserInfo)=>{
                    const {user, error} = await updateUser(convertRemoteToLocal.convertUser(isStaff?{...remoteUserInfo, isStaff}:remoteUserInfo));
                    return user;
                }
            )(remoteUserInfo);

            return {authenticated:sucess, userInfo, token};
        }
        else{
            throw new Error(message);
        }
    }
    catch(error){
        return {authenticated:false, error};
    }
}

module.exports = authenticate;
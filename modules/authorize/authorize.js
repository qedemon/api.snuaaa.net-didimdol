require("dotenv").config();
const fetch = require("node-fetch");
const {getUser, register} = require("modules/user/core");

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
            const userInfo = await (
                async (userInfo) =>{
                    userInfo._id = userInfo.user_id;
                    userInfo.colNo = userInfo.col_no;
                    userInfo.name = userInfo.username;
                    userInfo.aaaNo = userInfo.aaa_no;

                    const {user, error: getUserError} = await getUser(userInfo.user_id);
                    if(getUserError){
                        throw getUserError;
                    }
                    if(!user){
                        const {registered, error: registerError} = await register(userInfo);
                        if(registerError){
                            throw registerError;
                        }
                        return registered.user
                    }
                    return user;
                }
            )(remoteUserInfo);

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
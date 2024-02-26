require("dotenv").config();
const {updateUser} = require("../user/core");
const localAuthorize = require("./localAuthorize");
const remoteAuthorize = require("./remoteAuthorize");

async function authorize(token){
    try{
        const authorizings = [
            {
                authorize: localAuthorize,
                origin: "local"
            },
            {
                authorize: remoteAuthorize,
                origin: "remote"
            }
        ].map(
            async function({authorize, origin}){
                const {user, error} = await authorize(token);
                if(error){
                    throw error;
                }
                return {
                    user, origin
                }
            }
        );
        const result = await Promise.any(authorizings);
        if(!result){
            throw new Error("authorization Failed");
        }
        const {user, error} = await updateUser(result.user);
        if(error){
            throw new Error("error occured during update");
        }
        return {
            authorized: true,
            userInfo: user,
            origin: result.origin
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
require("dotenv").config();
const localAuthenticate = require("./localAuthenticate");
const remoteAuthenticate = require("./remoteAuthenticate");
const {updateUser} = require("modules/user/core");

async function authenticate(id, password, isStaff){
    try{
        const authentication = await (
            async (id, password)=>{
                const [remoteAuthenticating, localAuthenticating] = [
                    {
                        authenticate: localAuthenticate,
                        origin: "local"
                    },
                    {
                        authenticate: remoteAuthenticate,
                        origin: "remote"
                    }
                ].map(
                    async ({authenticate, origin})=>{
                        const {error, userInfo, token} = await authenticate(id, password);
                        if(error){
                            throw error;
                        }
                        return {
                            userInfo, token, origin
                        };
                    }
                );
                try{
                    const remoteAuthentication = await remoteAuthenticating;
                    if(!remoteAuthentication){
                        throw new Error("remoteAuthentication Error");
                    }
                    return remoteAuthentication;
                }
                catch(remoteError){
                    try{
                        const localAuthentication = await localAuthenticating;
                        if(!localAuthentication){
                            throw new Error("localAuthentication Error");
                        }
                        return localAuthentication;
                    }
                    catch(localError){
                        throw new Error(`remote error: ${remoteError.message} local error: ${localError.message}`);
                    }
                }
            }
        )(id, password);

        if(!authentication)
            throw new Error("authentication failed");

        const {userInfo, token, origin} = authentication;
        const {user: updated, error} = await updateUser(isStaff?{...userInfo, isStaff}:userInfo);
        if(error){
            throw error;
        }
        return {authenticated:true, userInfo: updated, token, origin};
    }
    catch(error){
        return {authenticated:false, error};
    }
}

module.exports = authenticate;
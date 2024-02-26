require("dotenv").config();
const localAuthenticate = require("./localAuthenticate");
const remoteAuthenticate = require("./remoteAuthenticate");
const {updateUser} = require("modules/user/core");

async function authenticate(id, password, isStaff){
    try{
        const authentication = await (
            async (id, password)=>{
                const [localAuthenticating, remoteAuthenticating] = [
                    {
                        authenticate: localAuthenticate,
                        origin: "local"
                    },
                    {
                        authenticate: remoteAuthenticate,
                        origin: "remote"
                    }
                ].map(
                    ({authenticate, origin})=>async (id, password)=>{
                        try{
                            const {error, userInfo, token} = await authenticate(id, password);
                            if(error){
                                throw error;
                            }
                            return {
                                authentication:{
                                    userInfo, token, origin
                                }
                            };  
                        }
                        catch(error){
                            return {
                                error
                            };
                        }
                    }
                );
                const {authentication: remoteAuthentication, error: remoteError} = await remoteAuthenticating(id, password);
                if(!remoteError){
                    return remoteAuthentication;
                }
                const {authentication: localAuthentication, error: localError} = await localAuthenticating(id, password);
                if(!localError){
                    return localAuthentication;
                }
                throw new Error(`remote: ${remoteError.message}, local: ${localError.message}`);
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
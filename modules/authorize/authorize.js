require("dotenv").config();
const {updateUser, getUser} = require("../user/core");
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
        try{
            const result = await Promise.any(authorizings);
            if(!result){
                throw new Error("authorization Failed");
            }
            const user = await (
                async (user)=>{
                    const {user: updatedUser, error: updateError} = await updateUser(user, true);
                    if(updateError){
                        throw updateError;
                    }
                    const {user: me, error} = await getUser({id: updatedUser.id});
                    if(error){
                        throw error;
                    }
                    return me;
                }
            )(result.user); 

            return {
                authorized: true,
                userInfo: user,
                origin: result.origin
            }
        }
        catch(error){
            throw error;
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
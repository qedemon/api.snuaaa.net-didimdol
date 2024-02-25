require("dotenv").config();
const localAuthenticate = require("./localAuthenticate");
const remoteAuthenticate = require("./remoteAuthenticate");
const {updateUser} = require("modules/user/core");

const remoteAPIHost = process.env.REMOTE_API_HOST;

async function authenticate(id, password, isStaff){
    try{
        const authentication = await (
            async (id, password)=>{
                const authenticatings = [
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
                return await Promise.any(authenticatings);
            }
        )(id, password);

        if(!authentication)
            throw new Error("authentication failed");

        const {userInfo, token, origin} = authentication;
        console.log(userInfo, token, origin);
        return {authenticated:true, userInfo, token, origin};
    }
    catch(error){
        return {authenticated:false, error};
    }
}

module.exports = authenticate;
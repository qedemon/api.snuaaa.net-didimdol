require("dotenv").config();
const {mongoose: {connect, disconnect}, createToken} = require("Utility");
const {getUser} = require("modules/user/core");

const id = process.argv[2];
const expiresIn = process.argv[3];

(
    async (id, expiresIn)=>{
        await connect();
        try{
            const user = await getUser({id});
            if(!user){
                throw new Error("no user");
            }
            const token = expiresIn?createToken(user, expiresIn):createToken(user);
            console.log(`token: ${token}`);
        }
        catch(error){
            console.error(error);
        }
        finally{
            await disconnect();
        }
    }
)(id, expiresIn)
const bcrypt = require("bcryptjs");
const {getUser} = require("modules/user/core");
const {createToken} = require("Utility");

async function localAuthenticate(id, password){
    try{
        const {user, error} = await getUser({id});
        if(error){
            throw error;
        }
        if(!user.password){
            throw new Error("no local password");
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck){
            throw new Error("wrong password");
        }
        return {
            userInfo: (
                (userInfo)=>{
                    const {password, ...remain} = userInfo;
                    return remain;
                }
            )(user),
            token: createToken(userInfo)
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = localAuthenticate;
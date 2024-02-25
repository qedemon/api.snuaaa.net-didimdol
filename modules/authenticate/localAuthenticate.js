const bcrypt = require("bcryptjs");
const {getUser} = require("modules/user/core");
const jwt = require('jsonwebtoken');

function createToken(userInfo){
    const key=process.env.JWT_KEY;
    const token=jwt.sign({'_id': userInfo._id}, key, {algorithm: "HS256", expiresIn: "1d", issuer: "snuaaa"});
    return token;
}


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
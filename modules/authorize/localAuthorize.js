require("dotenv").config();
const jwt = require('jsonwebtoken');
const {getUserBy_id} = require("modules/user/core");

function verifyToken(token){
    try{
        const key=process.env.JWT_KEY;
        const payload = jwt.verify(token, key);
        return {
            payload
        }
    }
    catch(error){
        return {
            error
        }
    }
}

async function localAuthorize(token){
    const {payload, error: tokenError} = verifyToken(token);
    if(tokenError){
        return {
            error: tokenError
        }
    }
    const {user, error: getUserError} = await getUserBy_id(payload._id);
    if(getUserError){
        return {
            error: getUserError
        }
    }
    if(!user){
        throw new Error(`no user found with ${payload._id}`);
    }
    return {
        user
    };
}

module.exports = localAuthorize;
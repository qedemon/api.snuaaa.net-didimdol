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
    const {payload, error} = verifyToken(token);
    if(error){
        return {
            error
        }
    }
    const user = await getUserBy_id(payload._id);
    if(!user){
        throw new Error(`no user found with ${payload._id}`);
    }
    return {
        user
    };
}

module.exports = localAuthorize;
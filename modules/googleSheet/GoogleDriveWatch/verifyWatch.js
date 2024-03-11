require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {GoogleDriveWatch} = require("models");
const jwt = require('jsonwebtoken');

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

async function verifyWatch(token){
    try{
        const {payload, error} = verifyToken(token);
        if(error){
            throw error;
        }
        await connect();
        const googleDriveWatch = await GoogleDriveWatch.findById(payload._id);
        if(!googleDriveWatch){
            throw new Error("no matched");
        }
        return {
            googleDriveWatch
        }
    }
    catch(error){
        return {error};
    }
}

module.exports = verifyWatch;
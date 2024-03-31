require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {User} = require("models");
const {request, convertLocalToRemote, createToken} = require("Utility");
const {getNow} = require("modules/time/core");

async function emptyFunction(){
    try{
        await connect();
        return {
            time: getNow()
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = emptyFunction;
const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {PasswordReset} = require("models");
const { validate } = require('uuid');

async function validatePasswordReset(id, uuid){
    try{
        if(!validate(uuid)){
            console.log("invalid", id, uuid);
            return false;
        }
        const passwordReset = await PasswordReset.findOne(
            {
                id,
                uuid,
                expiredAt: {
                    $gt: getNow()
                }
            }
        );
        return passwordReset?true:false;
    }
    catch(error){
        return false;
    }
}

module.exports = validatePasswordReset;
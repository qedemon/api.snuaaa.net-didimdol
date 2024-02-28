const {mongoose: {connect}} = require("Utility");
const {PasswordReset} = require("models");

async function deletePasswordReset(id){
    try{
        await connect();
        return {
            result: await PasswordReset.deleteMany({id})
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = deletePasswordReset;
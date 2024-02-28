const {mongoose: {connect}} = require("Utility");
const {PasswordReset} = require("models");

async function aquirePasswordReset(id){
    try{
        await connect();
        await PasswordReset.deleteMany({id});
        return {
            passwordReset: (
                await PasswordReset.create(
                    {
                        id
                    }
                )
            ).toObject()
        };
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = aquirePasswordReset;
const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication, QRAuthenticationLog} = require("models");
const catalogue = require("./catalogue");

async function getQRAuthentication(authenticationId, at=getNow()){
    try{
        await connect();
        const qrAuthentication = await QRAuthentication.findById(authenticationId);
        if(!qrAuthentication.isValidAt(at)){
            throw new Error("expired");
        }
        return {
            qrAuthentication
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getQRAuthentication;
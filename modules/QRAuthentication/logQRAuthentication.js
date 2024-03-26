const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication, QRAuthenticationLog} = require("models");
const catalogue = require("./catalogue");

async function logQRAuthentication(authenticationId, user, at=getNow()){
    try{
        await connect();
        const qrAuthentication = await QRAuthentication.findById(authenticationId);
        if(!qrAuthentication){
            throw Error(`invalid id ${authenticationId}`);
        }
        if(!qrAuthentication.isValidAt(at)){
            throw Error(`expired`);
        }
        const qrAuthenticationLog = await QRAuthenticationLog.findOneAndUpdate(
            {
                authentication: authenticationId,
                id: user.id,
                deleted: {$ne: true}
            },
            {
                authentication: authenticationId,
                id: user.id,
                authenticatedAt: at,
                message: catalogue[qrAuthentication.type].logMessage(user, at, qrAuthentication.context)
            },
            {
                upsert: true,
                new: true
            }
        );
        
        return {
            qrAuthentication,
            qrAuthenticationLog,
            rollback: async ()=>{
                return await QRAuthenticationLog.deleteOne({_id: qrAuthenticationLog._id});
            }
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = logQRAuthentication;
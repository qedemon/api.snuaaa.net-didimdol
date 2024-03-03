require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication} = require("models");
const path = require("path");
const catalogue = require("./catalogue");
const QRCode = require("qrcode");


async function getQRImage(author, authenticationId, at=getNow(), frontendHost=process.env.FRONTENT_HOST){
    try{
        await connect;
        const targetURL = await (
            async (author, authenticationId, at)=>{
                if(authenticationId==="register"){
                    return path.join(frontendHost, "#", "Register");
                }
                const qrAuthentication = await QRAuthentication.findById(authenticationId);
                if(!qrAuthentication){
                    return new Error("invalid id");
                }
                if(qrAuthentication.authorId !== author.id){
                    return new Error("Not an author");
                }
                if(!qrAuthentication.isValidAt(at)){
                    return new Error("expired");
                }
                return path.join(frontendHost, "#", "LogQRAuthentication", qrAuthentication._id);
            }
        )(author, authenticationId, at);
        return {
            targetURL,
            dataURL: await new Promise(
                (resolve, reject)=>{
                    QRCode.toDataURL(targetURL, (error, url)=>{
                        if(error){
                            reject(error);
                        }
                        resolve(url);
                    })
                }
            )
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getQRImage;
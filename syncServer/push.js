require("dotenv").config();
const {googleAuthorize, loadQRAuthentications} = require("modules/googleSheet/core");
const broadcastData = require("./WebSocket/broadcastData");

async function updateGoogleSheetForAuthenticationLog(qrAuthentication){
    try{
        const {sheet, error} = await googleAuthorize();
        if(error){
            throw error;
        }
        if(["별모임", "소관", "자율돔관", "etc"].includes(qrAuthentication.type)){
            return await loadQRAuthentications(process.env.QR_LOG_GOOGLE_SHEET_ID, sheet, 
                {
                    "context.title": qrAuthentication.context.title, 
                    type:{
                        $in:["별모임", "소관", "자율돔관", "etc"]
                    }
                }
            )
        }
        if("디딤돌" === qrAuthentication.type){
            return await loadQRAuthentications(process.env.QR_DIDIMDOL_LOG_GOOGLE_SHEET_ID, sheet, 
                {
                    "context.title": qrAuthentication.context.title, 
                    type: "디딤돌"
                }
            )
        }
        return {};
    }
    catch(error){
        return error;
    }
}

const pushProcesses = {
    "logQRAuthentication": {
        f: async ({qrAuthentication})=>{
            const updated = await updateGoogleSheetForAuthenticationLog(qrAuthentication);
            broadcastData(
                {
                    updated: ["attendant"]
                }
            )
            return updated;
        }
    },
    "addLogQRAuthenticationForUser": {
        f: async ({qrAuthentication})=>{
            const updated = await updateGoogleSheetForAuthenticationLog(qrAuthentication);
            broadcastData(
                {
                    updated: ["attendant"]
                }
            )
            return updated;
        }
    }
}

async function push(context){
    const pushProcess = pushProcesses[context.from];
    if(pushProcess){
        return await pushProcess.f(context);
    }
    return {};
}

module.exports = push;
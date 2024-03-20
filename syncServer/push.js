require("dotenv").config();
const {googleAuthorize, loadQRAuthentications} = require("modules/googleSheet/core");

const pushProcesses = {
    "logQRAuthentication": {
        f: async ({qrAuthentication})=>{
            try{
                const {sheet, error} = await googleAuthorize();
                if(error){
                    throw error;
                }
                return await loadQRAuthentications(process.env.QR_LOG_GOOGLE_SHEET_ID, sheet, {"context.title": qrAuthentication.context.title})
            }
            catch(error){
                return error;
            }
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
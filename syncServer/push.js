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
                    return await loadQRAuthentications(process.env.QR_DIDIMDOL_LOG_GOOGLE_SHEET_ID, sheet, {type: "디딤돌"})
                }
                return {};
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
require("dotenv").config();
const {googleAuthorize, loadQRAuthentications} = require("./core");

test("loadQRAuthentications", async ()=>{
    const {sheet} = await googleAuthorize();
    await [
        {
            sheetId: process.env.QR_LOG_GOOGLE_SHEET_ID,
            filter: {type: {$in: ["별모임", "소관", "자율돔관", "etc"]}}
        },
        {
            sheetId: process.env.QR_DIDIMDOL_LOG_GOOGLE_SHEET_ID,
            filter: {type: "디딤돌"}
        }
    ].reduce(
        async (last, {sheetId, filter})=>{
            await last;
            const {url, error} = await loadQRAuthentications(sheetId, sheet, filter);
            if(error){
                console.error(error);
                throw error;
            }
            console.log(url);
        },
        Promise.resolve()
    )
}, 10000)
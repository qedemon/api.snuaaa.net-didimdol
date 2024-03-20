require("dotenv").config();
const {googleAuthorize, loadAllQRAuthentications} = require("./core");

test("loadAllQRAuthentications", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url, error} = await loadAllQRAuthentications(process.env.QR_LOG_GOOGLE_SHEET_ID, sheet);
    if(error){
        console.error(error);
        throw error;
    }
    console.log(url);
}, 10000)
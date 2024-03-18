require("dotenv").config();
const {googleAuthorize, loadQRAuthentications} = require("./core");

test("loadQRAuthentications", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url, error} = await loadQRAuthentications(process.env.QR_LOG_GOOGLE_SHEET_ID, sheet);
    if(error){
        console.error(error);
        throw error;
    }
    console.log(url);
})
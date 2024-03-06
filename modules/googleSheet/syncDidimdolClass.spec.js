require("dotenv").config();
const {googleAuthorize, saveDidimdolClass, loadDidimdolClass} = require("./core");

test("syncDidimdolClass", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url:saveUrl, error:saveError} = await saveDidimdolClass(process.env.GOOGLE_SHEET_ID, sheet);
    if(saveError){
        console.error(saveError);
        throw error;
    }
    const {url:loadUrl, error:loadError} = await loadDidimdolClass(process.env.GOOGLE_SHEET_ID, sheet);
})
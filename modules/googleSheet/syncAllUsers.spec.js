require("dotenv").config();
const {googleAuthorize, loadAllUsers, saveAllUsers} = require("./core");

test("syncAllUsers", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url: saveUrl, error: saveError} = await saveAllUsers(process.env.GOOGLE_SHEET_ID, sheet);
    if(saveError){
        console.error(saveError);
        throw saveError
    }
    const {url: loadUrl, error: loadError} = await loadAllUsers(process.env.GOOGLE_SHEET_ID, sheet);
    if(loadError){
        console.error(loadError);
        throw loadError;
    }
    console.log(saveUrl, loadUrl);
})
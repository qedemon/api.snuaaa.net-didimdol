require("dotenv").config();
const {googleAuthorize, loadAllUsers} = require("./core");

test("loadAllUsers", async ()=>{
    const {sheet} = await googleAuthorize();
    const {url, error} = await loadAllUsers(process.env.GOOGLE_SHEET_ID, sheet);
    if(error){
        console.error(error);
        throw error;
    }
    console.log(url);
})
require("dotenv").config();
const {googleAuthorize, loadAllUsers, saveDidimdolClass, loadDidimdolClass} = require("modules/googleSheet/core");

const sync = async ()=>{
    const {sheet} = await googleAuthorize();
    await loadAllUsers(process.env.GOOGLE_SHEET_ID, sheet);
    await saveDidimdolClass(process.env.GOOGLE_SHEET_ID, sheet);
    await loadDidimdolClass(process.env.GOOGLE_SHEET_ID, sheet);
}

sync();

setInterval(
    ()=>{
        sync();
    },
    10*60*1000
);
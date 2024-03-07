require("dotenv").config();
const {googleAuthorize, loadAllUsers, saveAllUsers, saveDidimdolClass, loadDidimdolClass} = require("modules/googleSheet/core");

const sync = async ()=>{
    const {sheet} = await googleAuthorize();
    
    await [
        {
            f:saveAllUsers,
            sheetId: process.env.GOOGLE_SHEET_ID
        },
        {
            f:loadAllUsers,
            sheetId: process.env.GOOGLE_SHEET_ID
        },
        {
            f:saveDidimdolClass,
            sheetId: process.env.GOOGLE_SHEET_ID
        }, 
        {
            f:loadDidimdolClass,
            sheetId: process.env.GOOGLE_SHEET_ID
        }
    ].reduce(
        async (last, {f, sheetId})=>{
            try{
                await last;
                await f(sheetId, sheet)
            }
            catch(error){
                console.log(error);
            }
        },
        Promise.resolve()
    );
}

sync();

setInterval(
    ()=>{
        sync();
    },
    10*60*1000
);
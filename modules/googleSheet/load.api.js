require("dotenv").config();
const {loadAllUsers, loadAllQRAuthentications} = require("./core");
const midlayer = require("./midlayer");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

const SheetDocuments = {
    allUsers: {
        sheetId: process.env.GOOGLE_SHEET_ID,
        load: loadAllUsers
    },
    QRAuthentications: {
        sheetId: process.env.QR_LOG_GOOGLE_SHEET_ID,
        load: loadAllQRAuthentications
    }
}

function attachLoad(app){
    app.use("/load", midlayer);
    app.use("/load", authorize);
    app.get("/load/:key", async (req, res)=>{
        try{
            const {key} = req.params;
            const {authorization, googleAuthorization} = req;
            if(!authorization?.userInfo?.isAdmin){
                throw new Error(`permission denied`);
            }
            const targetDocument = SheetDocuments[key];
            if(!targetDocument){
                throw new Error(`invalid target ${key}`);
            }
            const {url, error} = await targetDocument.load(targetDocument.sheetId, googleAuthorization?.sheet);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
                    url,
                }
            )
        }
        catch(error){
            res.json({
                result: Result.fail,
                error: error.message
            })
        }
    })
    return app;
}

module.exports = attachLoad
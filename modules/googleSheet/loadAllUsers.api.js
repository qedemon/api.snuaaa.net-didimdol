require("dotenv").config();
const {loadAllUsers} = require("./core");
const midlayer = require("./midlayer");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

function attachLoadAllUsers(app){
    app.use("/loadAllUsers", midlayer);
    app.use("/loadAllUsers", authorize);
    app.get("/loadAllUsers", async (req, res)=>{
        try{
            const {authorization, googleAuthorization} = req;
            if(!authorization?.userInfo?.isStaff){
                throw new Error("permission denied");
            }
            const {url, error} = await loadAllUsers(process.env.GOOGLE_SHEET_ID, googleAuthorization?.sheet);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
                    url
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

module.exports = attachLoadAllUsers
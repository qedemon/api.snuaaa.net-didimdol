const {acquireQRAuthentication} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

function attachAcquireQRAuthentication(app){
    app.use("/acquireQRAuthentication", authorize);
    app.get("/acquireQRAuthentication/:type", async (req, res)=>{
        const {authorization} = req;
        const {type} = req.params;
        try{
            if(!authorization?.userInfo?.isStaff){
                throw new Error("permission denied");
            };
            const {qrAuthentication, error} = await acquireQRAuthentication(authorization.userInfo, type);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
                    qrAuthentication
                }
            )
        }
        catch(error){
            res.json(
                {
                    result: Result.fail,
                    error: error.message
                }
            )
        }
    })
    return app;
}

module.exports = attachAcquireQRAuthentication;
const {getQRAuthentication} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

function attachGetQRAuthentication(app){
    app.use("/getQRAuthentication", authorize);
    app.get("/getQRAuthentication/:authenticationId", async (req, res)=>{
        const {authorization} = req;
        const {authenticationId} = req.params;
        try{
            if(!authorization?.userInfo){
                throw new Error("permission denied");
            };
            const {qrAuthentication, error} = await getQRAuthentication(authenticationId);
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

module.exports = attachGetQRAuthentication;
const {getQRImage} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

function attachGetQRImage(app){
    app.use("/getQRImage", authorize);
    app.get("/getQRImage/:authenticationId", async (req, res)=>{
        try{
            const {dataURL, targetURL, error} = await getQRImage(req.authorization?.userInfo, req.params?.authenticationId);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
                    dataURL,
                    targetURL
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

module.exports = attachGetQRImage;
const {getQRAuthentications} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

function attachGetQRAuthenticationByTitle(app){
    app.use("/getQRAuthenticationByTitle", authorize);
    app.get("/getQRAuthenticationByTitle/:title", async (req, res)=>{
        const {authorization} = req;
        const {title} = req.params;
        try{
            if(!authorization?.userInfo?.isAdmin){
                throw new Error("permission denied");
            };
            const {authentications: qrAuthentication, error} = await getQRAuthentications({"context.title": title});
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
            console.log(error);
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

module.exports = attachGetQRAuthenticationByTitle;
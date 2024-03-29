const express = require("express");
const {logQRAuthentication} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");
const googleAuthorize = require("modules/googleSheet/midlayer");

function attachLogQRAuthentication(app){
    app.use("/logQRAuthentication", authorize);
    app.use("/logQRAuthentication", googleAuthorize)
    app.use("/logQRAuthentication", express.json());
    app.post("/logQRAuthentication", async (req, res)=>{
        try{
            const userInfo = req.authorization?.userInfo;
            const {authenticationId} = req.body;
            if(!userInfo){
                throw new Error(`invalid user`);
            }
            const {qrAuthentication, qrAuthenticationLog, error} = await logQRAuthentication(authenticationId??"", userInfo);
            if(error){
                throw error
            }
            await sync.push({from: "logQRAuthentication", userInfo, qrAuthentication, qrAuthenticationLog});
            res.json(
                {
                    result: Result.success,
                    qrAuthentication,
                    qrAuthenticationLog
                }
            );
        }
        catch(error){
            res.json(
                {
                    result: Result.fail,
                    error: error.message
                }
            )
        }
    });
    return app;
}

module.exports = attachLogQRAuthentication;
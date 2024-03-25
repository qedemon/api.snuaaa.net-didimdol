const express = require("express");
const {acquireQRAuthentication, logQRAuthentication} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");

function attachAddQRAuthenticationLogForUser(app){
    app.use("/addQRAuthenticationLogForUser", authorize);
    app.use("/addQRAuthenticationLogForUser", express.json());
    app.post("/addQRAuthenticationLogForUser", async (req, res)=>{
        try{
            const userInfo = req.authorization?.userInfo;
            const {targetUserId} = req.body;
            if(!userInfo){
                throw new Error(`invalid user`);
            }
            const permitted = (userInfo.didimdolClass?.belongs??[])
                .filter(({role, didimdolClass})=>!didimdolClass?.hide && ["lecturer", "assistant"].includes(role))
                .some(
                    ({didimdolClass})=>{
                        return (didimdolClass?.students??[]).some(({id})=>targetUserId===id)
                    }
                );
            //await sync.push({from: "logQRAuthentication", userInfo, qrAuthentication, qrAuthenticationLog});
            res.json(
                {
                    result: Result.success,
                    permitted,
                    userInfo
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

module.exports = attachAddQRAuthenticationLogForUser;
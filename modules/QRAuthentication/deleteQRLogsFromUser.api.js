const express = require("express");
const {deleteQRLogsFromUser} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");

function attachDeleteQRLogsFromUser(app){
    app.use("/deleteQRLogsFromUser", authorize);
    app.use("/deleteQRLogsFromUser", express.json());
    app.post("/deleteQRLogsFromUser", async (req, res)=>{
        try{
            const userInfo = req.authorization?.userInfo;
            const {targetUserId, filter} = req.body;
            if(!userInfo){
                throw new Error(`invalid user`);
            }
            const permitted = userInfo?.isAdmin || (userInfo.didimdolClass?.belongs??[])
                .filter(({role, didimdolClass})=>!didimdolClass?.hide && ["lecturer", "assistant"].includes(role))
                .some(
                    ({didimdolClass})=>{
                        return (didimdolClass?.students??[]).some(({id})=>targetUserId===id)
                    }
                );
            if(!permitted){
                throw new Error(`edit for the user ${targetUserId} is not permitted`);
            }

            const {deleted, error} = await deleteQRLogsFromUser(targetUserId, filter);
            if(error){
                throw error;
            }

            //await sync.push({from: "logQRAuthentication", userInfo, qrAuthentication, qrAuthenticationLog});
            res.json(
                {
                    result: Result.success,
                    deleted
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

module.exports = attachDeleteQRLogsFromUser;
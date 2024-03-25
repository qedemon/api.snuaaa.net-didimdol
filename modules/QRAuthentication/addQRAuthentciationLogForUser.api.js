const express = require("express");
const {getUser} = require("modules/user/core");
const {acquireQRAuthentication, logQRAuthentication} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");

function attachAddQRAuthenticationLogForUser(app){
    app.use("/addQRAuthenticationLogForUser", authorize);
    app.use("/addQRAuthenticationLogForUser", express.json());
    app.post("/addQRAuthenticationLogForUser", async (req, res)=>{
        try{
            const userInfo = req.authorization?.userInfo;
            const {targetUserId, createdAt, type, options} = req.body;
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
                throw new Error(`add for the user ${targetUserId} is not permitted`);
            }

            const qrAuthentication = await (
                async (author, type, options, at)=>{
                    const {qrAuthentication, error} = await acquireQRAuthentication(author, type, options, at);
                    if(error){
                        throw error;
                    }
                    return qrAuthentication;
                }
            )(userInfo, type, options??{}, new Date(createdAt));
            
            const targetUser = await (
                async (userId)=>{
                    const {user, error} = await getUser({id: userId});
                    if(error){
                        throw error;
                    }
                    return user;
                }
            )(targetUserId);

            const qrAuthenticationLog = await (
                async (authenticationId, user, at)=>{
                    const {qrAuthenticationLog, error} = await logQRAuthentication(authenticationId, user, at);
                    if(error){
                        throw error;
                    }
                    return qrAuthenticationLog;
                }
            )(qrAuthentication._id, targetUser, new Date(createdAt))

            await sync.push({from: "addLogQRAuthenticationForUser", targetUserId, qrAuthentication, qrAuthenticationLog});
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

module.exports = attachAddQRAuthenticationLogForUser;
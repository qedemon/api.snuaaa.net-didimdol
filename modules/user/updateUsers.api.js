const express = require("express");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");
const {updateUsers} = require("./core");
const googleAuthorize = require("modules/googleSheet/midlayer");
const {loadAllUsers} = require("modules/googleSheet/core");

function attachUpdateUsers(app){
    app.use("/updateUsers", authorize);
    app.use("/updateUsers", express.json());
    app.use("/updateUsers", googleAuthorize);
    app.post("/updateUsers", async (req, res)=>{
        try{
            const dataToUpdate = req.body;
            const {authorization} = req;
            const targetUsers = authorization?.userInfo?.isStaff?
                dataToUpdate:
                dataToUpdate.filter(
                    ({id})=>id===authorization?.userInfo?.id
                );
            
            const {updated, error} = await updateUsers(targetUsers);
            if(error){
                throw error;
            }
            await sync.push({from: "updateUsers", updated});
            res.json(
                {
                    result: Result.success,
                    updated: {
                        updated
                    }
                }
            )
        }
        catch(error){
            res.json(
                {
                    result: Result.fail,
                    error: error.message
                }
            );
        }
    });
    return app;
}

module.exports = attachUpdateUsers;
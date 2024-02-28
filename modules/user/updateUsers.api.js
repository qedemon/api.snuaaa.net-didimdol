const express = require("express");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {updateUsers} = require("./core");

function attachUpdateUsers(app){
    app.use("/updateUsers", authorize);
    app.use("/updateUsers", express.json());
    app.post("/updateUsers", async (req, res)=>{
        try{
            const dataToUpdate = req.body;
            const {authorization} = req;
            const targetUsers = authorization?.userInfo?.isStaff?
                dataToUpdate:
                dataToUpdate.filter(
                    ({id})=>id===authorization?.userInfo?.id
                );
            
            const updated = await updateUsers(targetUsers);
            
            res.json(
                {
                    updated
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
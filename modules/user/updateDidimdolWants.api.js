const express = require("express");
const authorize = require("modules/authorize/middleware");
const {Result, Log, sync} = require("Utility");
const {updateDidimdolWants} = require("./core");

function attachUpdateDidimdolWants(app){
    app.use("/updateDidimdolWants", authorize);
    app.use("/updateDidimdolWants", express.json());
    app.post("/updateDidimdolWants", async (req, res)=>{
        try{
            const {id, wants} = req.body;
            const {authorization} = req;
            const authorized = authorization?.userInfo?.isStaff||authorization?.userInfo?.isAdmin||id===authorization?.userInfo?.id
            if(!authorized){
                throw new Error("permission denied.");
            }
            
            const {updated, error} = await updateDidimdolWants(id, wants);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
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

module.exports = attachUpdateDidimdolWants;
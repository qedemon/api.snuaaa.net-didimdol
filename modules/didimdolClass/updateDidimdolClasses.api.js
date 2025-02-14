const express = require("express");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {updateDidimdolClasses} = require("./core");

function attachUpdateDidimdolClasses(app){
    const apiPath = "/updateDidimdolClasses";
    app.use(apiPath, authorize);
    app.use(apiPath, express.json());
    app.post(apiPath, async (req, res)=>{
        try{
            if(!req.authorization?.userInfo?.isAdmin){
                throw new Error("permission error");
            }
            const updates = req.body;
            const {didimdolClasses, error} = await updateDidimdolClasses(updates);
            if(error){
                throw error
            }
            res.json(
                {
                    result: Result.success,
                    didimdolClasses
                }
            );
        }
        catch(error){
            console.log(error);
            res.json( 
                {
                    result: Result.fail,
                    error: error.message
                }
            );
        }
    })
}

module.exports = attachUpdateDidimdolClasses;
require("dotenv").config();
const express = require("express");
const {register} = require("./core");
const {Result, Log, sync} = require("Utility");
const googleAuthorize = require("modules/googleSheet/midlayer");
const {loadAllUsers} = require("modules/googleSheet/core");

function attachRegister(app){
    app.use("/register", express.json());
    app.use("/register", googleAuthorize);
    app.post("/register", async (req, res)=>{
        const userInfo = req.body;
        try{
            const {userInfo: registered, token, error} = await register(userInfo);
            if(error){
                throw error;
            }
            Log({message: "success", registered});
            await sync.push({from: "regitser", user: registered});
            res.json(
                {
                    result: Result.success,
                    registered,
                    token
                }
            );
        }
        catch(error){
            console.log(error)
            Log({userInfo, error:error.message});
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

module.exports = attachRegister;
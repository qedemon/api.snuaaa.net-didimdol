require("dotenv").config();
const express = require("express");
const {register} = require("./core");
const {Result, Log} = require("Utility");
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
            res.json(
                {
                    result: Result.success,
                    registered,
                    token
                }
            );
            try{
                await loadAllUsers(process.env.GOOGLE_SHEET_ID, req.googleAuthorization?.sheet);
            }
            catch(error){
                console.log(error);
            }
        }
        catch(error){
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
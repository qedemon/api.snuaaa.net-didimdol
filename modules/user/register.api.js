const express = require("express");
const {register} = require("./core");
const Result = require("Utility/Result");

function attachRegister(app){
    app.use("/register", express.json());
    app.post("/register", async (req, res)=>{
        const userInfo = req.body;
        try{
            const {userInfo: registered, token, error} = await register(userInfo);
            if(error){
                throw error;
            }
            res.json(
                {
                    registered,
                    token
                }
            );
        }
        catch(error){
            res.json(
                {
                    error: error.message
                }
            )
        }
    });
    return app;
}

module.exports = attachRegister;
require("dotenv").config();
const path = require("path");
const express = require("express");
const {Result} = require("Utility");
const {remoteResetPassword} = require("./core");

function attachRemoteResetPassword(app){
    app.use("/remoteResetPassword", express.json());
    app.post('/remoteResetPassword', async (req, res)=>{
        const {id, email, name} = (
            (user)=>({
                id: user.id.trim(),
                email: user.email.trim(),
                name: user.name.trim()
            })
        )(req.body);
        try{
            const {success, error} = await remoteResetPassword(id, name, email);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: success?Result.success:Result.fail,
                    sendEmail: success
                }
            )   
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

module.exports = attachRemoteResetPassword;
require("dotenv").config();
const path = require("path");
const express = require("express");
const {acquirePasswordReset ,validatePasswordReset} = require("modules/PasswordReset/core");
const {getUser} = require("./core");
const {Result, sendEmail} = require("Utility");

function attachResetPassword(app){
    app.use("/resetPassword", express.json());
    app.post('/resetPassword', async (req, res)=>{
        const {id, email, name} = (
            (user)=>({
                id: user.id.trim(),
                email: user.email.trim(),
                name: user.name.trim()
            })
        )(req.body);
        try{
            const user = await (
                async (id, email, name)=>{
                    const {user, error} = await getUser({id, email, name});
                    if(error){
                        throw error;
                    }
                    return user;
                }
            )(id, email, name);

            const passwordReset = await (
                async (id)=>{
                    const {passwordReset, error} = await acquirePasswordReset(id);
                    if(error){
                        throw error;
                    }
                    return passwordReset;
                }
            )(user.id);
            res.json(
                {
                    result: Result.success,
                    sendEmail: await sendEmail(user.email, "password reset", 
                        `<a href="https://${path.join(process.env.FRONTEND_HOST, "#", "control", "changePassword", passwordReset.uuid)}">${user.id} 비밀번호 찾기</a>`)
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

module.exports = attachResetPassword;
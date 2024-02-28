const express = require("express");
const authorize = require("modules/authorize/middleware");
const {validatePasswordReset} = require("modules/PasswordReset/core");
const {changePassword, matchPassword} = require("./core");
const {Result} = require("Utility");

function attachChagnePassword(app){
    app.use("/changePassword", authorize);
    app.use("/changePassword", express.json());
    app.post('/changePassword', async (req, res)=>{
        const {id, newPassword, originalPassword, uuid} = req.body;
        try{
            const passwordResetValidation = await validatePasswordReset(id, uuid);
            const authroizedValidation = req.authorization?.authorized && req.authorization?.userInfo?.id === id && await matchPassword(id, originalPassword);
            const changePasswordAvailable = passwordResetValidation || authroizedValidation;

            if(!changePasswordAvailable){
                if(!passwordResetValidation)
                    throw new Error("expired password reset")
                throw new Error("invalid request");
            }
            const {user, error} = await changePassword(id, newPassword);
            if(error){
                throw error;
            }
            if(!user){
                return new Error("change password failed");
            }
            res.json(
                {
                    result: Result.success,
                    user
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

module.exports = attachChagnePassword;
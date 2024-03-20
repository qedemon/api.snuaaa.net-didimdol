require("dotenv").config();
const express = require("express");
const googleAuthorize = require("../googleAuthorize");
const syncWatch = require("./syncWatch");
const googleMidlayer = require("../midlayer");
const verifyWatch = require("./verifyWatch");
const stopWatch = require("./stopWatch");
const onUpdateWatch = require("./onUpdateWatch");
const createWatch = require("./createWatch");
const {getNow} = require("modules/time/core");

function attahchNotification(app){
    app.use("/notification", express.json());
    app.use("/notification", googleMidlayer);
    app.use("/notification", async (req, res, next)=>{
        const {"x-goog-channel-id": id, "x-goog-resource-id": resourceId, "x-goog-channel-expiration": expiration, "x-goog-channel-token": token, "x-goog-resource-state": state, 'x-goog-changed': changed} = req.headers;
        try{
            const {googleDriveWatch, error} = await verifyWatch(token);
            if(error){
                throw error;
            }
            req.googleDriveWatch = {
                state,
                changed,
                googleDriveWatch
            };
            next();
        }
        catch(error){
            console.log("rejected", state, id, resourceId);
            stopWatch(id, resourceId, req.googleAuthorization.drive)
            res.json({});
        }
    })
    app.post("/notification", async (req, res)=>{
        try{
            const {drive, sheet} = req.googleAuthorization;
            const {googleDriveWatch, state, changed} = req.googleDriveWatch;
            const {result, error} = await (
                async (state)=>{
                    switch(state){
                        case "sync":
                            return (await syncWatch(googleDriveWatch.id, googleDriveWatch.resourceId));
                        case "update":
                            return (await onUpdateWatch(changed, googleDriveWatch.fileId, sheet));
                        default:
                            return {result: false};
                    }
                }
            )(state);

            if(error){
                throw error;
            }
            
            console.log(state, changed, result, getNow());
            res.json({result});
        }
        catch(error){
            console.log(error);
            res.json({error});
        }
    });
    return app;
}

attahchNotification.onLoad = async ()=>{
    /*try{
        const drive = await (
            async ()=>{
                const {drive, error} = await googleAuthorize();
                if(error){
                    throw error;
                }
                return drive;
            }
        )();
        const create = async ()=>{
            const {googleDriveWatch, error: createError} = await createWatch(process.env.GOOGLE_SHEET_ID, drive);
            if(createError){
                throw createError;
            }
            console.log("created", googleDriveWatch);
        };
        await create();
        setInterval(create, 5*60*1000);

        return true;
    }
    catch(error){
        console.log(error);
        return false;
    }*/
}

module.exports = attahchNotification;
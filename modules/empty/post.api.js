const express = require("express");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {emptyFunction} = require("./core");

function attachPost(app){
    const apiPath = "/post";
    app.use(apiPath, authorize);
    app.use(apiPath, express.json());
    app.post(apiPath, async (req, res)=>{
        try{
            const {time, error} = await emptyFunction();
            if(error){
                throw error
            }
            res.json(
                {
                    result: Result.success,
                    time
                }
            );
        }
        catch(error){
            res.json( 
                {
                    result: Result.fail,
                    error: error.message
                }
            );
        }
    })
}

module.exports = attachPost;
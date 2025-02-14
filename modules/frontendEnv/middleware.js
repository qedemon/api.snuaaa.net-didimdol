const express = require("express");
const {frontendEnv, setFrontendEnv} = require("./core");
const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");

const app = express();
app.get("/", async (req, res)=>{
    const value = await frontendEnv();
    res.json(
        value
    )
})

app.use("/", authorize);
app.use("/", express.json());
app.post("/", async (req, res)=>{
    try{
        if(!req.authorization?.userInfo?.isAdmin){
            throw new Error("permission error");
        }
        const updateValue = req.body;
        const value = await setFrontendEnv(updateValue);
        res.json(
            value
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

app.onLoad = ()=>{
    console.log("frontendenv module loaded...");
    return true;
}

module.exports = app;
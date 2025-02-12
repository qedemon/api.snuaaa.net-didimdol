const express = require("express");
const {frontendEnv} = require("./core");

const app = express();
app.get("/", async (req, res)=>{
    const value = await frontendEnv();
    res.json(
        value
    )
})
app.onLoad = ()=>{
    console.log("frontendenv module loaded...");
    return true;
}

module.exports = app;
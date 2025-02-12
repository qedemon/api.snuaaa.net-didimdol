const express = require("express");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "frontendEnv"
        }
    )
})
app.onLoad = ()=>{
    console.log("frontendenv module loaded...");
    return true;
}

module.exports = app;
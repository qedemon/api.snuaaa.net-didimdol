require("dotenv").config();
const express = require("express");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            url: process.env.WS_SERVER_ADDRESS
        }
    )
})
app.onLoad = ()=>{
    console.log("websocket module loaded...");
    return true;
}

module.exports = app;
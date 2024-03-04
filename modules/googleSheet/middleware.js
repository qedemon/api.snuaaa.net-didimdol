const express = require("express");
const attachLoadAllUsers = require("./loadAllUsers.api");

const app = express();
app.get("/", (req, res)=>{
    res.json({
        test: "google sheet"
    })
})
attachLoadAllUsers(app);

module.exports=app;
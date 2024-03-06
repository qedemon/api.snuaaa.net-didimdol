const express = require("express");
const attachLoadAllUsers = require("./loadAllUsers.api");
const attachLoad = require("./load.api")

const app = express();
app.get("/", (req, res)=>{
    res.json({
        test: "google sheet"
    })
})
attachLoadAllUsers(app);
attachLoad(app);

module.exports=app;
const express = require("express");
const attachLoadAllUsers = require("./loadAllUsers.api");
const attachLoad = require("./load.api")
const attahchNotification = require("./GoogleDriveWatch/notification.api");

const app = express();
app.get("/", (req, res)=>{
    res.json({
        test: "google sheet"
    })
})
attachLoadAllUsers(app);
attachLoad(app);
attahchNotification(app);

app.onLoad=()=>{
    console.log("googleSheet module loaded.");
    return attahchNotification.onLoad();
}

module.exports=app;
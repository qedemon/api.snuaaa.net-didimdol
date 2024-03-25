const express = require("express");
const attachAcquireQRAuthentication = require("./acquireQRAuthentication.api");
const attachLogQRAuthentication = require("./logQRAuthentication.api");
const attachGetQRImage = require("./getQRImage.api");
const attachGetQRAuthenticationById = require("./getQRAuthenticationById.api");
const attachAddQRAuthenticationLogForUser = require("./addQRAuthentciationLogForUser.api");
const attachDeleteQRLogsFromUser = require("./deleteQRLogsFromUser.api");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "QRAuthentication"
        }
    )
})
attachAcquireQRAuthentication(app);
attachLogQRAuthentication(app);
attachGetQRImage(app);
attachLogQRAuthentication(app);
attachGetQRAuthenticationById(app);
attachAcquireQRAuthentication(app);
attachAddQRAuthenticationLogForUser(app);
attachDeleteQRLogsFromUser(app);

app.onLoad = ()=>{
    console.log("QRAuthentication module loaded.");
    return true;
}

module.exports = app;

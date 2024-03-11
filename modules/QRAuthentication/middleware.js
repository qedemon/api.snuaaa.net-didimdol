const express = require("express");
const attachAcquireQRAuthentication = require("./acquireQRAuthentication.api");
const attachLogQRAuthentication = require("./logQRAuthentication.api");
const attachGetQRImage = require("./getQRImage.api");
const attachGetQRAuthentication = require("./getQRAuthentication.api")

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
attachGetQRAuthentication(app);

app.onLoad = ()=>{
    console.log("QRAuthentication module loaded.");
    return true;
}

module.exports = app;

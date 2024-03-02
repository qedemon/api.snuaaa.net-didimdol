const express = require("express");
const attachAcquireQRAuthentication = require("./acquireQRAuthentication.api");
const attachLogQRAuthentication = require("./logQRAuthentication.api");

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

module.exports = app;

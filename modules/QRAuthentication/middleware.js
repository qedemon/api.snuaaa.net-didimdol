const express = require("express");
const attachAcquireQRAuthentication = require("./acquireQRAuthentication.api");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "QRAuthentication"
        }
    )
})
attachAcquireQRAuthentication(app);

module.exports = app;

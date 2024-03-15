const express = require("express");
const app = express();
const {Result} = require("Utility");
const {loadAllQRAuthentications} = require("modules/googleSheet/core");

app.use("/", express.json());
app.post("/push", (req, res)=>{
    const context = req.body;
    console.log("push", context);
    res.json({result: Result.success});
});
app.post("/pull", (req, res)=>{
    const context = req.body;
    console.log("pull", context);
    res.json({result: Result.success});
})

module.exports = app;
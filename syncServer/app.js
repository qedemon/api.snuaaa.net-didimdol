const express = require("express");
const app = express();
const {Result} = require("Utility");
const push = require("./push");

app.use("/", express.json());
app.post("/push", async (req, res)=>{
    const context = req.body;
    console.log("push", context);
    res.json(
        {
            result: Result.success,
        }
    );
    console.log(await push(context));
});
app.post("/pull", async (req, res)=>{
    const context = req.body;
    console.log("pull", context);
    res.json({result: Result.success});
})

module.exports = app;
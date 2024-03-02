const express = require("express");
const attachAllDidimdolClasses = require("./allDidimdolClasses.api");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "didimdolClass"
        }
    )
})
attachAllDidimdolClasses(app);

module.exports = app;
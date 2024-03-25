const express = require("express");
const attachAllDidimdolClasses = require("./allDidimdolClasses.api");
const attachUpdateDidimdolClasses = require("./updateDidimdolClasses.api");
const attachGetDidimdolClassById = require("./getDidimdolClassById.api");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "didimdolClass"
        }
    )
})
attachAllDidimdolClasses(app);
attachUpdateDidimdolClasses(app);
attachGetDidimdolClassById(app);

app.onLoad = ()=>{
    console.log("didimdolClass module loaded...");
    return true;
}

module.exports = app;
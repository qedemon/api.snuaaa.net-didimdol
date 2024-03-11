const express = require("express");
const attachGet = require("./get.api");
const attachPost = require("./post.api");

const app = express();
app.get("/", (req, res)=>{
    res.json(
        {
            name: "empty"
        }
    )
})
attachGet(app);
attachPost(app);
app.onLoad = ()=>{
    console.log("empty module loaded...");
    return true;
}

module.exports = app;
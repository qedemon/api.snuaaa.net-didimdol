const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, "routes.json"), "utf-8"));

module.exports = ()=>{
    const app = express();
    app.use(cors());
    routes.map(
        ({name, route})=>{
            try{
                const loaded_module = require(route);
                if(loaded_module.middleware){
                    app.use(`/${name}`, loaded_module.middleware);
                }
            }
            catch(error){
                console.error(`An error occured during loading module ${name}`);
                console.error(error);
            }
        }
    )
    app.get("/", (req, res)=>{
        res.json(
            {
                message: "this is didimdol api."
            }
        )
    })
    return app;
}
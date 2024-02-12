const authorize = require("modules/authorize/middleware");

function attachWhoAmI(app){
    app.use("/whoAmI", authorize);
    app.get("/whoAmI", (req, res)=>{
        res.json(req.authorization)
    })
    return app;
}

module.exports = attachWhoAmI;
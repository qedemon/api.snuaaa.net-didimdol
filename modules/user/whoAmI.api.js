const authorize = require("modules/authorize/middleware");

function attachWhoAmI(app){
    app.use("/whoAmI", authorize);
    app.get("/whoAmI", (req, res)=>{
        res.status(req?.authorization?.authorized?200:401).json(req.authorization)
    })
    return app;
}

module.exports = attachWhoAmI;
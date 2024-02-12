const {getNow} = require("./core");
const {Result} = require("Utility");

function attachGetNow(app){
    app.get("/getNow", (req, res)=>{
        res.json(
            {
                result: Result.success,
                now: getNow()
            }
        )
    })
    return app;
}

module.exports = attachGetNow;
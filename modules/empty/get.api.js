const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {emptyFunction} = require("./core");

function attachGet(app){
    const apiPath = "/get";

    app.use(apiPath, authorize);
    app.get(apiPath, async (req, res)=>{
        try{
            const {time, error} = await emptyFunction();
            if(error){
                throw error
            }
            res.json(
                {
                    result: Result.success,
                    time
                }
            );
        }
        catch(error){
            res.json( 
                {
                    result: Result.fail,
                    error: error.message
                }
            );
        }
    })
    return app;
}

module.exports = attachGet;
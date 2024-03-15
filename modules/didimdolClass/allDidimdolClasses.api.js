const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {allDidimdolClasses} = require("./core");

function attachAllDidimdolClasses(app){
    const apiPath = "/allDidimdolClasses";

    app.use(apiPath, authorize);
    app.get(apiPath, async (req, res)=>{
        try{
            if(!req.authorization?.authorized){
                throw new Error("invalid user");
            }
            const {didimdolClasses, error} = await (req?.authorization?.userInfo?.isAdmin?allDidimdolClasses():allDidimdolClasses(["title", "daytime", "description"], []));
            if(error){
                throw error
            }
            res.json(
                {
                    result: Result.success,
                    didimdolClasses
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

module.exports = attachAllDidimdolClasses;
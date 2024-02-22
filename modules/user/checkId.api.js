const {checkId} = require("./core");
const Result = require("Utility/Result");

function attachCheckId(app){
    app.get("/checkId/:id", async (req, res)=>{
        try{
            const id = req.params.id;
            const {result, error} = await checkId(id);
            if(error){
                throw error;
            }
            res.json(
                {
                    result: Result.success,
                    check: result
                }
            );
        }
        catch(error){
            res.json(
                {   
                    result: Result.fail,
                    error: error.message
                }
            )
        }
    })
    return app;
}

module.exports = attachCheckId;
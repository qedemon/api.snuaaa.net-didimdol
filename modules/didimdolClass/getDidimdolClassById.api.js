const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {getDidimdolClassById} = require("./core");

function attachGetDidimdolClassById(app){
    const apiPath = "/getDidimdolClassById";

    app.use(apiPath, authorize);
    app.get(`${apiPath}/:didimdolClassId`, async (req, res)=>{
        try{
            const targetId = req.params.didimdolClassId;
            if(!req.authorization?.authorized){
                throw new Error("invalid user");
            }
            const belongIds = (req.authorization.userInfo?.didimdolClass?.belongs??[])
                .filter(({role})=>["lecturer", "assistant"].includes(role))
                .map(({didimdolClass:{_id}})=>String(_id));

            if(!req.authorization.userInfo?.isAdmin && !belongIds.includes(targetId)){
                throw new Error(`access to ${targetId} is not permitted`)
            }

            const {didimdolClass, error} = await getDidimdolClassById(targetId);
            if(error){
                throw error;
            }
            
            res.json(
                {
                    result: Result.success,
                    didimdolClass
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

module.exports = attachGetDidimdolClassById;
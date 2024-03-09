const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {getUser} = require("./core");

function attachFindId(app){
    app.get("/findId/:name/:email", async (req, res)=>{
        try{
            const {name, email} = req.params;
            const {user, error} = await getUser({name: name.trim(), email: email.trim()});
            
            if(error){
                throw error;
            }
            if(!user){
                throw new Error("no matched user");
            }
            res.json(
                {
                    result: Result.success,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                }
            )
        }
        catch(error){
            res.json(
                {
                    result: Result.fail,
                    error: error.message
                }
            )
        }
    });
    return app;
}

module.exports = attachFindId;
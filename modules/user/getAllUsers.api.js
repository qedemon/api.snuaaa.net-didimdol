const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {getAllUsers} = require("./core");

function attachGetAllUsers(app){
    app.use("/getAllUsers", authorize);
    app.get("/getAllUsers", async (req, res)=>{
        try{
            if(!req.authorization?.userInfo?.isStaff){
                throw new Error("permission error");
            }
            const {users, error} = await getAllUsers({isStaff: false}, ["-password", "-_id"]);
            if(error){
                throw error;
            }
            res.json(
                {
                    users
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
    });
    return app;
}

module.exports = attachGetAllUsers;
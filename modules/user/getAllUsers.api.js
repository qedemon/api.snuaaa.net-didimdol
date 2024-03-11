const authorize = require("modules/authorize/middleware");
const {Result} = require("Utility");
const {getAllUsers} = require("./core");

const filters = {
    all: {},
    students: {
        isStudent: true,
        isStaff: false,
    },
    staffs: {
        isStaff: true
    },
    etc: {
        isStudent: {
            $ne: true
        },
        isStaff: {
            $ne: true
        }
    }
}

function attachGetAllUsers(app){
    app.use("/getAllUsers", authorize);
    app.get("/getAllUsers", (req, res)=>{
        res.redirect(302, "getAllUsers/students");
    });
    app.get("/getAllUsers/:target", async (req, res)=>{
        try{
            if(!req.authorization?.userInfo?.isAdmin){
                throw new Error("permission error");
            }
            const [target, filter] = (
                (target)=>{
                    if(!target){
                        return ["all", filters.all];
                    }
                    return filters[target]?[target, filters[target]]:["all", filters.all];
                }
            )(req.params.target);
            const {users, error} = await getAllUsers(filter, ["-password", "-_id"]);
            if(error){
                throw error;
            }
            res.json(
                {
                    target,
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
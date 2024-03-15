const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getUser(filter){
    try{
        await connect();
        const user = await User.findOne(filter)
            .populate({path: "QRAuthenticationLogs", populate:{path: "authentication"}})
            .populate({path: "didimdolClass.belongs", populate:
                [
                    {path: "lecturer", select:["name", "colNo", "major"]},
                    {path: "assistants", select:["name", "colNo", "major"]}
                ]
            });
        if(!user){
            throw new Error("no user");
        }
        return {
            user: (
                (userInfo)=>{
                    const {QRAuthenticationLogs, ...remain} = userInfo;
                    return remain;
                }
            )(user.toObject())
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getUser;
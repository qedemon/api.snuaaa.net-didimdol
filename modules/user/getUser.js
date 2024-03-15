const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getUser(filter){
    try{
        await connect();
        const user = await (
            (query)=>{
                const populate = {path: "lecturer", select: ["name", "colNo", "major"]};
                return ["isLecturerIn", "isAssistantIn", "isStudentIn"].reduce(
                    (query, key)=>{
                        return query.populate({path: `didimdolClass.${key}`, populate});
                    },
                    query
                )
            }
        )(
            User.findOne(filter)
            .populate({path: "QRAuthenticationLogs", populate:{path: "authentication"}})
        );
        if(!user){
            throw new Error("no user");
        }
        return {
            user: (
                (userInfo)=>{
                    const {QRAuthenticationLogs, didimdolClass, ...remain} = userInfo;
                    const {isLecturerIn, isAssistantIn, isStudentIn, ...remainDidimdolClass} = didimdolClass; 
                    return {...remain, didimdolClass: remainDidimdolClass};
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
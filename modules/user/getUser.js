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
                    const {QRAuthenticationLogs, ...remains} = userInfo;
                    const attendance = QRAuthenticationLogs.filter(({authentication})=>authentication).reduce(
                        (result, {authentication, authenticatedAt, message})=>{
                            return {
                                ...result,
                                [authentication?.context?.title??"unnamed"]:{
                                    type: authentication?.type,
                                    authorId: authentication?.authorId,
                                    authenticatedAt,
                                    message
                                }
                            }
                        },
                        {}
                    )
                    return {...remains, attendance};
                }
            )(user.toObject({virtuals: true}))
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getUser;
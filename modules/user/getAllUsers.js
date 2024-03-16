const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getAllUsers(filter={}, select=[], populate=["didimdolClass.belongs"]){
    try{
        await connect();
        const populations = {
            "didimdolClass.belongs": (query)=>{
                const populate = [{path: "lecturer", select: ["name", "colNo", "major"]}, {path: "assistants", select: ["name", "colNo", "major"]}];
                return ["isLecturerIn", "isAssistantIn", "isStudentIn"].reduce(
                    (query, key)=>{
                        return query.populate({path: `didimdolClass.${key}`, populate});
                    },
                    query
                )
            },
            "didimdolClass.wants": (query)=>query.populate("didimdolClass.wants", ["_id", "title", "daytime"])
        }
        const users = (
            await (
                (query)=>populate.reduce(
                    (result, populatePath)=>{
                        return (populations[populatePath]??(x=>x))(result)
                    },
                    query
                )
            )(User.find(filter).select(select))
        ).sort((A, B)=>{
            const extract = (aaaNo)=>aaaNo?parseInt(aaaNo.match(/\d+$/)[0]):-1;
            if(A.createdAt>B.createdAt){
                return -1
            }
            else if(A.createdAt<B.createdAt){
                return 1;
            }
            else
                return extract(B.aaaNo)-extract(A.aaaNo);
        });

        return {
            users: (users??[]).map((user)=>user.toObject({virtuals: true}))
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getAllUsers;
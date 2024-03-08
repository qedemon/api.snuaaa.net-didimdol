const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getAllUsers(filter={}, select=[], populate=["didimdolClass.belongs"]){
    try{
        await connect();
        const populations = {
            "didimdolClass.belongs": (query)=>query.populate("didimdolClass.belongs", ["_id", "title", "lecturerId", "daytime", "-studentIds"]),
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
        ).sort(({aaaNo: A}, {aaaNo: B})=>{
            const extract = (aaaNo)=>aaaNo?parseInt(aaaNo.match(/\d+$/)[0]):-1;
            return extract(B)-extract(A);
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
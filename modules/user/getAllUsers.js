const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getAllUsers(filter={}, select=[]){
    try{
        await connect();
        const users = (
            await User.find(filter).select(select)
                .populate("didimdolClass.belongs", ["_id", "title", "lecturerId", "daytime", "-studentIds"])
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
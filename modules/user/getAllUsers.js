const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getAllUsers(filter, select){
    try{
        await connect();
        const users = (await User.find(filter).select(select)).sort(({aaaNo: A}, {aaaNo: B})=>{
            const extract = (aaaNo)=>parseInt(aaaNo.match(/\d+$/)[0]);
            return extract(B)-extract(A);
        });
        return {
            users: (users??[]).map((user)=>user.toObject())
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getAllUsers;
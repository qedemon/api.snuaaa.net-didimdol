const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function getAllUsers(filter, select){
    try{
        await connect();
        const users = await User.find(filter).select(select).sort({createdAt: -1, aaaNo: -1});
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
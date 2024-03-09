const updateUser = require("./updateUser");

async function updateUsers(users=[], upsert=false){
    try{
        const updated = await Promise.all(
            users.map(
                ({isAdmin, aaaNo, ...user})=>{
                    return updateUser(user, upsert)
                }
            )
        );
        return {
            updated
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = updateUsers;
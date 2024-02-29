const updateUser = require("./updateUser");

async function updateUsers(users=[], upsert=false){
    try{
        const updated = await Promise.all(
            users.map(
                (user)=>updateUser(user, upsert)
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
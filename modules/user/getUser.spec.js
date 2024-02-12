const getUser = require("./getUser");

test("getUser", async ()=>{
    const {user, error} = getUser(23);
    if(error){
        throw error;
    }
    console.log(user);
});
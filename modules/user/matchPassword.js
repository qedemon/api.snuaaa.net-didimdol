const {mongoose: {connect}} = require("Utility");
const {User} = require("models");
const bcrypt = require("bcryptjs");

async function matchPassword(id, password){
    try{
        await connect();
        const user = await User.findOne({id}).select(["id", "password"]);
        if(!user){
            throw Error("no user");
        }
        return await bcrypt.compare(password, user.password);
    }
    catch(error){
        return false
    }
}

module.exports = matchPassword;
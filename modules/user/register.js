const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function register(userInfo){
    try{
        await connect();
        const user = await User.findById(userInfo._id);
        const registerdUser = user?
            null:
            await User.create(userInfo);
        const revoke = registerdUser?
            async ()=>{
                return await User.findByIdAndDelete(_id);
            }:
            ()=>{
                return {}
            }

        return {
            registered: {
                user: user??registerdUser,
                registered: user?true:false,
                revoke
            }
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = register
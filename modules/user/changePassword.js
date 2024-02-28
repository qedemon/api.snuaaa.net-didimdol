const {mongoose: {connect}} = require("Utility");
const {User} = require("models");
const bcrypt = require("bcryptjs");

async function changePassword(id, newPassword){
    try{
        if(!(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword) && newPassword.length>=8)){
            throw new Error("비밀번호는 알바벳 숫자 포함 8글자 이상입니다.");
        }
        await connect();
        const cryptedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
        const user = await User.findOneAndUpdate({id}, {password: cryptedPassword}, {new: true, projection: ["-password"]});
        return {
            user: user.toObject()
        }
    }
    catch(error){
        return {
            error
        }
    }
}
module.exports = changePassword;
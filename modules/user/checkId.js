const {mongoose: {connect}} = require("Utility");
const {User} = require("models");

async function checkId(id){
    try{
        await connect();
        if(id.length===0){
            return {
                result: {
                    check: false,
                    message: "아이디는 한 글자 이상"
                }
            }
        }
        const user = await User.findOne({id}, ["_id"]);
        return {
            result: {
                check: user?false:true,
                message: !user?
                    "사용 가능한 아이디입니다.":
                    "중복된 아이디입니다."
            }
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = checkId;
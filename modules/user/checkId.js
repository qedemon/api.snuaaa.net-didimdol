const {mongoose: {connect}} = require("Utility");
const {User} = require("models");
const fetch = require("node-fetch");

const remoteAPIHost = process.env.REMOTE_API_HOST;

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
        const options = {
            method: "POST",
            mode: "cors",
            chache: "no-chache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({check_id: id})
        }
        const {success: remoteCheck} = await (await fetch(`${remoteAPIHost}/api/auth/signup/dupcheck/`, options)).json();
        const localCheck = await (
            async (id)=>{
                const user = await User.findOne(
                    {
                        id
                    }
                );
                return user?false:true;
            }
        )(id);
        return {
            result: {
                check: remoteCheck&&localCheck,
                message: remoteCheck?
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
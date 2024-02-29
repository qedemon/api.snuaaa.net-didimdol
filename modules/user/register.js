require("dotenv").config();
const bcrypt = require("bcryptjs");
const {mongoose: connect} = require("Utility");
const User = require("models/User");
const checkId = require("./checkId");
const {acquireAAANo} = require("modules/aaaNo/core");
const {request, convertLocalToRemote, createToken} = require("Utility");

const validations = {
    name: (value)=>{
        return (value.length>0)?
        {
            result: true
        }:
        {
            result: false,
            message: "적어도 한 글자 이상 입력해주세요."
        }
    },
    colNo: (value)=>{
        return (/^\d{4}$/.test(value))?
        {
            result: true
        }:
        {
            result: false,
            message: "학번 형식에 맞추어 주세요."
        }
    },
    major: (value)=>{
        return (value.length>0)?
        {
            result: true
        }:
        {
            result: false,
            message: "적어도 한 글자 이상 입력해주세요."
        }
    },
    email: (value)=>{
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))?
        {
            result: true
        }:
        {
            result: false,
            message: "이메일 형식에 맞추어 주세요."
        }
    },
    mobile: (value)=>{
        return (/^\d{3}-\d{3,4}-\d{4}$/.test(value))?
        {
            result: true
        }:
        {
            result: false,
            message: "전화번호 형식에 맞추어 주세요."
        }
    },
    id: (value)=>{
        return (value.length>0)?
        {
            result: true
        }:
        {
            result: false,
            message: "적어도 한 글자 이상 입력해주세요."
        }
    },
    password: (value)=>{
        return (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value) && value.length>=8)?
        {
            result: true
        }:
        {
            result: false,
            message: "비밀번호는 알바벳 숫자 포함 8글자 이상입니다."
        }
    },
    depositor: (value)=>{
        return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한글자는 입력해 주세요."
            }
    },
    course: (value)=>{
        return value.length>0?
            {
                result: true
            }:
            {
                result: false,
                message: "과정을 선택해 주세요. (학부 or 대학원 or 기타)"
            }
    }
}

async function register(userInfo){
    try{
        await (//중복검사
            async (id)=>{
                const {result, error} = await checkId(id);
                if(error){
                    throw error;
                }
                if(!result?.check){
                    throw new Error("중복된 아이디입니다.");
                }
            }
        )(userInfo.id);
        const filtered = Object.entries(validations)
        .reduce(
            (result, [key, validate])=>{
                try{
                    const {result: validated, message} = validate(userInfo[key]??"");
                    if(!validated){
                        throw new Error(message);
                    }
                    return {
                        ...result,
                        [key]: userInfo[key]
                    }
                }
                catch(error){
                    throw new Error(`${key}: ${error.message}`);
                }
            },
            {}
        );
        const added = await (
            async ({colNo, ...userInfo})=>{
                const {aaaNo, error} = await acquireAAANo(userInfo.id);
                if(error){
                    throw error;
                }
                return {
                    ...userInfo,
                    colNo: process.env.CURRENT_COL_NO,//동아리학번
                    schoolNo: colNo,//학부학번
                    aaaNo
                }
            }
        )(filtered);
        const crypted = await (
            async ({password, ...userInfo})=>{
                return {
                    ...userInfo,
                    password: await bcrypt.hash(password, await bcrypt.genSalt(10))
                }
            }
        )(added);

        const localRegistered = await User.create(crypted);
        const localToken = createToken(localRegistered);

        const withoutPassword = (
            ({password:_, ...userInfo})=>{
                return userInfo;
            }
        )(localRegistered.toObject());

        const remoteUserInfo = convertLocalToRemote.convertUser(added);
        
        await request.post("api/auth/signup", remoteUserInfo); //회원가입
        const {token: remoteToken, userInfo: loginUserInfo} = await (
            async (id, password)=>{
                const loginInfo = await request.post("api/auth/login/", {id, password});
                const {sucess, userInfo, token, message} = loginInfo;
                if(!sucess){
                    throw new Error(message);
                }
                return {token, userInfo};
            }
        )(remoteUserInfo.id, remoteUserInfo.password);

        return {
            userInfo: withoutPassword,
            token: remoteToken || localToken
        }
    }
    catch(error){
        console.log(error);
        return {
            error
        }
    }
}

module.exports = register;
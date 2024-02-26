function convertUser(user){
    return {
        id: user.id,
        password: user.password,
        passwordCf: user.password,
        username: user.name,
        email: user.email,
        mobile: user.mobile,
        aaaNum: user.aaaNo,
        schoolNum: user.colNo,
        major: user.major,
        introduction: ""
    }
}

module.exports={convertUser};
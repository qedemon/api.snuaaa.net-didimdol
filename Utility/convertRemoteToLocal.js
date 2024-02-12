function convertUser(user){
    return {
        ...user,
        _id: user.user_id,
        name: user.username,
        aaaNo: user.aaa_no,
        colNo: user.col_no
    }
}

module.exports = {
    convertUser
}
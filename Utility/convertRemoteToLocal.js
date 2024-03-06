require("dotenv").config();

function convertUser(user){
    return {
        ...user,
        _id: user.user_id,
        name: user.username,
        aaaNo: user.aaa_no,
        colNo: user.col_no,
        profilePath: user.profile_path?`${process.env.REMOTE_API_HOST}/static${user.profile_path}`:null
    }
}

module.exports = {
    convertUser
}
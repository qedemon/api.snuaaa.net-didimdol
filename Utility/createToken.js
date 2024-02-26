const jwt = require('jsonwebtoken');

function createToken(userInfo){
    const key=process.env.JWT_KEY;
    const token=jwt.sign({'_id': userInfo._id}, key, {algorithm: "HS256", expiresIn: "60d", issuer: "snuaaa"});
    return token;
}

module.exports = createToken;
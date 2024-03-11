const jwt = require('jsonwebtoken');

function createToken(userInfo, expiresIn="60d"){
    const key=process.env.JWT_KEY;
    const token=jwt.sign({'_id': userInfo._id}, key, {algorithm: "HS256", expiresIn, issuer: "snuaaa"});
    return token;
}

module.exports = createToken;
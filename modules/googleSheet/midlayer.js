const {googleAuthorize} = require("./core");

module.exports = async (req, res, next)=>{
    const {error, ...authorization} = await googleAuthorize();
    req.googleAuthorization = error?
        {
            error
        }:
        {
            ...authorization
        };
    next();
}
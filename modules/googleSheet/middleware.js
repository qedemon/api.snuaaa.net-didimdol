const {googleAuthorize} = require("./core");

module.exports = async (req, res, next)=>{
    const {authorization, error} = await googleAuthorize();
    req.googleAuthorization = error?
        {
            error
        }:
        {
            authorization
        };
    next();
}
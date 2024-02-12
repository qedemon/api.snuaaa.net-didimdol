const core = require("./core");
const middleware = require("./middleware");

console.log("authenticate module loaded.");
module.exports = {
    core,
    middleware
}
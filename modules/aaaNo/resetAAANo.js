const {mongoose: {connect}} = require("Utility");
const {AAANo} = require("models");

async function resetAAANo(){
    await connect();
    await AAANo.deleteMany({});
}

module.exports = resetAAANo;
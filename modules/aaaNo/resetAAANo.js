const {mongoose: {connect}} = require("Utility");
const {AAANo} = require("models");

async function resetAAANo(){
    await connect();
    await AAANo.deleteMany({});
    await AAANo.create({aaaNo: 3});
}

module.exports = resetAAANo;
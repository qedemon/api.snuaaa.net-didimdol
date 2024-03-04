const {connect} = require("./mongoose");
const {Log: LogModel} = require("models");

async function Log(message){
    await connect();
    return await LogModel.create({message});
}

module.exports = Log;
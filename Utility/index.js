const Result = require("./Result");
const mongoose = require("./mongoose");
const convertRemoteToLocal = require("./convertRemoteToLocal");
const convertLocalToRemote = require("./convertLocalToRemote");
const request = require("./remoteConnection");
const createToken = require("./createToken")

module.exports= {
    Result,
    mongoose,
    convertRemoteToLocal,
    convertLocalToRemote,
    request,
    createToken
}
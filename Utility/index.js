const Result = require("./Result");
const mongoose = require("./mongoose");
const convertRemoteToLocal = require("./convertRemoteToLocal");
const convertLocalToRemote = require("./convertLocalToRemote");
const request = require("./remoteConnection");
const createToken = require("./createToken");
const Log = require("./Log");
const sendEmail = require("./sendEmail");
const sync = require("./sync");

module.exports= {
    Result,
    mongoose,
    convertRemoteToLocal,
    convertLocalToRemote,
    request,
    createToken,
    Log,
    sendEmail,
    sync
}
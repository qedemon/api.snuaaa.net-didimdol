const acquireQRAuthentication = require("./acquireQRAuthentication");
const logQRAuthentication = require("./logQRAuthentication");
const getQRImage = require("./getQRImage");
const getAllAuthentications = require("./getAllAuthentications");
const getQRAuthenticationById = require("./getQRAuthenticationById");
const getQRAuthentications = require("./getQRAuthentications");
const deleteQRLogsFromUser = require("./deleteQRLogsFromUser");

module.exports = {
    acquireQRAuthentication,
    logQRAuthentication,
    getQRImage,
    getAllAuthentications,
    getQRAuthenticationById,
    getQRAuthentications,
    deleteQRLogsFromUser
}
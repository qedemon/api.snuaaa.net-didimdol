const googleAuthorize = require("./googleAuthorize");
const loadAllUsers = require("./loadAllUsers");
const loadAllQRAuthentications = require("./loadAllQRAuthentications");
const loadQRAuthentications = require("./loadQRAuthentications");
const saveDidimdolClass = require("./saveDidimdolClass");
const loadDidimdolClass = require("./loadDidimdolClass");
const saveAllUsers = require("./saveAllUsers");

module.exports = {
    googleAuthorize,
    loadAllUsers,
    loadAllQRAuthentications,
    loadQRAuthentications,
    saveDidimdolClass,
    loadDidimdolClass,
    saveAllUsers
}
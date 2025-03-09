const getUserBy_id = require("./getUserBy_id");
const getUser = require("./getUser");
const checkId = require("./checkId");
const updateUser = require("./updateUser");
const register = require("./register");
const changePassword = require("./changePassword");
const matchPassword = require("./matchPassword");
const getAllUsers = require("./getAllUsers");
const updateUsers = require("./updateUsers");
const updateDidimdolWants = require("./updateDidimdolWants");
const remoteResetPassword = require("./remoteResetPassword");

module.exports = {
    getUserBy_id,
    getUser,
    checkId,
    updateUser,
    register,
    changePassword,
    matchPassword,
    getAllUsers,
    updateUsers,
    updateDidimdolWants,
    remoteResetPassword
}
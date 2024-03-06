const attachWhoAmI = require("./whoAmI.api");
const attachCheckId = require("./checkId.api");
const attachRegister = require("./register.api");
const attachChagnePassword = require("./changePassword.api");
const attachGetAllUsers = require("./getAllUsers.api");
const attachUpdateUsers = require("./updateUsers.api");
const attachFindId = require("./findId.api");
const attachResetPassword = require("./resetPassword.api");
const express = require("express");

const app = express();
attachWhoAmI(app);
attachCheckId(app);
attachRegister(app);
attachChagnePassword(app);
attachGetAllUsers(app);
attachUpdateUsers(app);
attachFindId(app);
attachResetPassword(app);

module.exports = app;
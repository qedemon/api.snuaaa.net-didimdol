const attachWhoAmI = require("./whoAmI.api");
const attachCheckId = require("./checkId.api");
const attachRegister = require("./register.api");
const attachChagnePassword = require("./changePassword.api");
const attachGetAllUsers = require("./getAllUsers.api");
const attachUpdateUsers = require("./updateUsers.api");
const express = require("express");

const app = express();
attachWhoAmI(app);
attachCheckId(app);
attachRegister(app);
attachChagnePassword(app);
attachGetAllUsers(app);
attachUpdateUsers(app);

module.exports = app;
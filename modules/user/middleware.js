const attachWhoAmI = require("./whoAmI.api");
const attachCheckId = require("./checkId.api");
const express = require("express");

const app = express();
attachWhoAmI(app);
attachCheckId(app);

module.exports = app;
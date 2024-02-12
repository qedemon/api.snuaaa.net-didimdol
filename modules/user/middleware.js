const attachWhoAmI = require("./whoAmI.api");
const express = require("express");

const app = express();
attachWhoAmI(app);

module.exports = app;
const express = require("express");
const attachGetNow = require("./getNow.api");

const app = express();
attachGetNow(app);

module.exports = app;
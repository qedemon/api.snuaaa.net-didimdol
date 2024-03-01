const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const QRAuthenticationLogSchema = new mongoose.Schema(
    {
        authentication: {
            type: String,
            ref: "QRAuthentication"
        },
        id: {
            type: String,
            index: true
        },
        authenticatedAt: {
            type: Date,
            default: ()=>getNow()
        },
        message: String
    },
    {
        versionKey : false 
    }
)

const QRAuthenticationLog = mongoose.model("QRAuthenticationLog", QRAuthenticationLogSchema);

module.exports = QRAuthenticationLog;
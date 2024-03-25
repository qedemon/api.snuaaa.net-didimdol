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
        message: String,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey : false 
    }
);

QRAuthenticationLogSchema.virtual("user",
    {
        ref: "User",
        localField: "id",
        foreignField: "id"
    }
);

const QRAuthenticationLog = mongoose.model("QRAuthenticationLog", QRAuthenticationLogSchema);

module.exports = QRAuthenticationLog;
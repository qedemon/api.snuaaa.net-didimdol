const mongoose = require("mongoose");
const { randomUUID } = require('crypto');
const {getNow} = require("modules/time/core");

const GoogleDriveWatchSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: ()=>randomUUID()
        },
        resourceId: String,
        fileId: String,
        createdAt: {
            type: Date,
            default: ()=>getNow()
        },
        expiration: {
            type: Date,
            default: ()=>new Date(getNow().getTime()+10*60*1000)
        },
        state: {
            type: String,
            default: "init"
        }
    },
    {
        versionKey : false 
    }
)

const GoogleDriveWatch = mongoose.model("GoogleDriveWatch", GoogleDriveWatchSchema);

module.exports = GoogleDriveWatch;
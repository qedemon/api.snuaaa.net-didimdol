const mongoose = require("mongoose");
const { randomUUID } = require('crypto');
const {getNow} = require("modules/time/core");

const QRAuthenticationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: ()=>randomUUID()
        },
        type: {
            type: String,
            index: true
        },
        authorId: {
            type: String,
            index: true
        },
        createdAt: {
            type: Date,
            default: ()=>getNow()
        },
        expiredAt: {
            type: Date,
            default: ()=>{return new Date(getNow().getTime()+5*60*1000);}
        },
        context: mongoose.Schema.Types.Mixed
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        versionKey : false,
        methods: {
            isValidAt(at){
                return (this.createdAt<=at) && (at<this.expiredAt);
            }
        }
    }
)

QRAuthenticationSchema.virtual("logs",
    {
        ref: "QRAuthenticationLog",
        localField: "_id",
        foreignField: "authentication"
    }
);

const QRAuthentication = mongoose.model("QRAuthentication", QRAuthenticationSchema);

module.exports = QRAuthentication;
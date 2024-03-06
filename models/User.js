const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const PushSchema = new mongoose.Schema(
    {
        _id: false,
        subscription: mongoose.Schema.Types.Mixed
    },
    {
        versionKey : false 
    }
)

const UserSchema = new mongoose.Schema(
    {
        name: String,
        password: {type: String, default: null},
        aaaNo: String,
        schoolNo: String,
        id: {type: String, index: true, unique: true},
        email: String,
        mobile: {type: String, default: null},
        password: {type: String, default: null},
        isAdmin: {type: Boolean, default: false},
        isStaff: {type: Boolean, default: false},
        colNo: {type: String, default: "24"},
        major: {type: String, default: "아마추어천문학과"},
        depositor: String,
        course: {type: String, default: "학부"},
        createdAt: {type: Date, default: new Date("2024-02-29")},
        paid: {type: Boolean, default: false},
        didimdolClass: {
            wants: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "DidimdolClass"
                }
            ],
            belongs: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "DidimdolClass",
                default: null
            },
            party: {
                type: Boolean,
                default: null
            }
        },
        isStudent: {
            type: Boolean,
            default: false
        },
        profilePath: String,
        push: PushSchema
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        versionKey : false 
    }
)
UserSchema.virtual("attendances",
    {
        ref: "QRAuthenticationLog",
        localField: "id",
        foreignField: "id"
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
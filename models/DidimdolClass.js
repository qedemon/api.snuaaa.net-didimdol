const mongoose = require("mongoose");

const DidimdolClassSchema = new mongoose.Schema(
    {
        lecturer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        asistants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        time: {
            day: {
                type: String,
                enum: {
                    values: ["월", "화", "수", "목", "금"]
                }
            },
            start: String,
            end: String
        },
        description: {
            kewords: [String],
            ratios: [
                {
                    label: String,
                    ratio: Number
                }
            ],
            introduction: String
        }
    },
    {
        toJSON: {virtuals: true},
        versionKey : false 
    }
)

const DidimdolClass = mongoose.model("DidimdolClass", DidimdolClassSchema);

module.exports = User;
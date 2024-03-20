const mongoose = require("mongoose");

const DidimdolClassSchema = new mongoose.Schema(
    {
        hide:{
            type: Boolean,
            default: false  
        },
        title: {
            type: String,
            default: "1",
            index: true
        },
        lecturerId: String,
        assistantIds: [String],
        studentIds: [String],
        daytime: {
            type: {
                day: {
                    type: String,
                    enum: {
                        values: ["월", "화", "수", "목", "금"]
                    }
                },
                start: String,
                end: String
            },
            _id: false
        },
        description: {
            type:{
                keywords: [String],
                ratios: {
                    type:[
                        {
                            label: String,
                            ratio: Number
                        }
                    ],
                    _id: false
                },
                introduction: String
            },
            _id: false
        },
        imgSrc: String
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        versionKey : false 
    }
)
DidimdolClassSchema.virtual("lecturer", {
    ref: "User",
    localField: 'lecturerId',
    foreignField: "id"
});
DidimdolClassSchema.virtual("assistants", {
    ref: "User",
    localField: 'assistantIds',
    foreignField: "id"
});
DidimdolClassSchema.virtual("students", {
    ref: "User",
    localField: 'studentIds',
    foreignField: "id"
});


const DidimdolClass = mongoose.model("DidimdolClass", DidimdolClassSchema);

module.exports = DidimdolClass;
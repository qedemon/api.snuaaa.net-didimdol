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
        imgSrc: String,
        backgroundColor: String,
        freeze: {
            type: Boolean,
            default: false
        },
        maxWant: {
            type: Number,
            default: 20
        }
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
DidimdolClassSchema.virtual("attendant").get(
    function(){
        return (this.students??[]).reduce(
            (result, {attendant})=>{
                return {
                    ...result,
                    ...(
                        Object.entries(
                            attendant?.logs??{}
                        )
                        .filter(
                            ([_, {type}])=>type==="디딤돌"
                        )
                        .reduce(
                            (result, [key, {createdAt}])=>({...result, [key]: createdAt}), {}
                        )
                    )
                }
            },
            {}
        );
    }
)
DidimdolClassSchema.virtual('wants', {
    ref: 'User', // The model to use
    localField: "_id",
    foreignField: 'didimdolClass.wants[0]', // is equal to `foreignField`
    count: true, // And only get the number of docs
    match: {isStudent: true}
});

const DidimdolClass = mongoose.model("DidimdolClass", DidimdolClassSchema);

module.exports = DidimdolClass;
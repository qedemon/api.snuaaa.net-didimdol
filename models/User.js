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
            firstWant: {
                didimdolClass: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "DidimdolClass"
                },
                at: {type: Date}
            },
            lastWants: [
                {
                    didimdolClass: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "DidimdolClass"
                    },
                    at: {type: Date}
                }
            ],
            /*wants: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "DidimdolClass"
                }
            ],*/
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
        freeze: {
            type: Boolean,
            default: false
        },
        attendant: {
            info: mongoose.Schema.Types.Mixed,
        },
        push: PushSchema
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        versionKey : false 
    }
)
UserSchema.virtual("QRAuthenticationLogs",
    {
        ref: "QRAuthenticationLog",
        localField: "id",
        foreignField: "id",
        match: {deleted: {$ne: true}}
    },
);
UserSchema.virtual("attendant.logs").get(
    function (){
        const logs = (this.QRAuthenticationLogs??[]).filter(({authentication})=>authentication).reduce(
            (result, {authentication, authenticatedAt, message})=>{
                return {
                    ...result,
                    [authentication?.context?.title??"unnamed"]:{
                        type: authentication?.type,
                        createdAt: authentication?.createdAt,
                        authorId: authentication?.authorId,
                        authenticatedAt,
                        message
                    }
                }
            },
            {}
        )
        return logs;
    }
)
UserSchema.virtual("didimdolClass.isStudentIn", 
    {
        ref: "DidimdolClass",
        localField: "id",
        foreignField: "studentIds",
        match: { hide: {$ne: true} }
    }
);
UserSchema.virtual("didimdolClass.isAssistantIn", 
    {
        ref: "DidimdolClass",
        localField: "id",
        foreignField: "assistantIds",
        match: { hide: {$ne: true} }
    }
);
UserSchema.virtual("didimdolClass.isLecturerIn",
    {
        ref: "DidimdolClass",
        localField: "id",
        foreignField: "lecturerId",
        match: { hide: {$ne: true} }
    }
)
UserSchema.virtual("didimdolClass.belongs").get(
    function(){
        return [
            {key: "isStudentIn", role: "student"},
            {key:"isAssistantIn", role: "assistant"},
            {key: "isLecturerIn", role: "lecturer"}
        ]
        .reduce(
            (result, {key, role})=>{
                return this.didimdolClass[key]?[
                    ...result,
                    ...this.didimdolClass[key].map(didimdolClass=>({role, didimdolClass}))
                ]:[];
            },
            []
        )
        .filter(({didimdolClass:{hide}})=>!hide)
    }
);
UserSchema.virtual("didimdolClass.wants").get(
    function(){
        const firstWant = this.didimdolClass?.firstWant?.didimdolClass;

        return [...(firstWant?[firstWant]:[]), ...this.didimdolClass?.lastWants.map(({didimdolClass})=>didimdolClass)];
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User;
const mongoose = require("mongoose");

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
        _id: Number,
        name: String,
        aaaNo: String,
        id: String,
        email: String,
        isAdmin: {type: Boolean, default: false},
        colNo: {type: String, default: "23"},
        major: {type: String, default: "아마추어천문학과"},
        push: PushSchema
    },
    {
        toJSON: {virtuals: true},
        versionKey : false 
    }
)
UserSchema.virtual("user_id").get(function(){
    return this._id;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
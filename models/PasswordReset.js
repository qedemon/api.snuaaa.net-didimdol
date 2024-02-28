const mongoose = require("mongoose");
const { randomUUID } = require('crypto');
const {getNow} = require("modules/time/core");

const PasswordResetSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            default: ()=>randomUUID(),
            index: true
        },
        id: {
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
        }
    },
    {
        versionKey : false 
    }
)
/*UserSchema.virtual("user_id").get(function(){
    return this._id;
});*/

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

module.exports = PasswordReset;
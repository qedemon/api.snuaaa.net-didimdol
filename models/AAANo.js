const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const AAANoSchema = new mongoose.Schema(
    {
        aaaNo: {type: Number, default: 0},
        owner: {type: String, default: "snuaaa"},
        aquiredAt: {type: Date, default: ()=>{getNow}}
    },
    {
        versionKey : false 
    }
)
/*UserSchema.virtual("user_id").get(function(){
    return this._id;
});*/

const AAANo = mongoose.model("AAANo", AAANoSchema);

module.exports = AAANo;
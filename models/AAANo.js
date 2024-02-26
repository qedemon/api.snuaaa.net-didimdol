const mongoose = require("mongoose");

const AAANoSchema = new mongoose.Schema(
    {
        aaaNo: {type: Number, default: 0},
        owner: String,
        aquiredAt: Date
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
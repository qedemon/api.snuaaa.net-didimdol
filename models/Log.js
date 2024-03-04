const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const LogSchema = new mongoose.Schema(
    {
        message: mongoose.Schema.Types.Mixed,
        createdAt: {type: Date, default: ()=>getNow()}
    },
    {
        versionKey : false 
    }
)
/*UserSchema.virtual("user_id").get(function(){
    return this._id;
});*/

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
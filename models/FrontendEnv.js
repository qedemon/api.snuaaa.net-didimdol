const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const FrontendEnvSchema = new mongoose.Schema(
    {
        가입비: {type: String},
        createdAt: {type: Date, default: ()=>getNow()},
    },
    {
        versionKey : false 
    }
)
/*UserSchema.virtual("user_id").get(function(){
    return this._id;
});*/

const FrontendEnv = mongoose.model("FrontendEnv", FrontendEnvSchema);

module.exports = FrontendEnv;
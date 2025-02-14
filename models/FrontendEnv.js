const mongoose = require("mongoose");
const {getNow} = require("modules/time/core");

const FrontendEnvSchema = new mongoose.Schema(
    {
        values: {type: mongoose.Schema.Types.Mixed, default: ()=>{return {}}},
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
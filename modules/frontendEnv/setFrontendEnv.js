require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {FrontendEnv} = require("models");

async function setFrontendEnv(updateValue){
    try{
        await connect();
        const value = await (
            async ()=>{
                const update = Object.entries(updateValue).reduce((result, [key, value])=>({...result, [`values.${key}`]: value}), {});
                return FrontendEnv.findOneAndUpdate({}, update, {new: true, upsert: true});
            }
        )();

        return value.toObject();
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = setFrontendEnv;
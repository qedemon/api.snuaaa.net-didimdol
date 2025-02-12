require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {FrontendEnv} = require("models");

async function frontendEnv(){
    try{
        await connect();
        const value = await (
            async ()=>{
                const loaded = await FrontendEnv.findOne();
                if(loaded)
                    return loaded;
                const created = await FrontendEnv.create({});
                return created;
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

module.exports = frontendEnv;
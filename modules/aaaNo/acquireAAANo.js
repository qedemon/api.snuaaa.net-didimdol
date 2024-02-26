require("dotenv").config();
const {mongoose: {connect}} = require("Utility");
const {AAANo} = require("models");
const {getNow} = require("modules/time/core");

async function acquireAAANo(ownerId){
    try{
        await connect();
        const result = await AAANo.findOneAndUpdate({}, 
            {
                $inc: {
                    aaaNo: 1
                },
                $set: {
                    owner: ownerId,
                    aquiredAt: getNow()
                }
            },
            {
                returnDocument: "after",
                upsert: true
            }
        )
        return {
            aaaNo: `${process.env.CURRENT_COL_NO}AAA-${result.aaaNo}`
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = acquireAAANo;
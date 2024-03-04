const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication} = require("models");
const catalogue = require("./catalogue");

async function acquireQRAuthentication(author, type, at=getNow()){
    try{
        const item = catalogue[type];
        if(!item){
            throw new Error(`invalid type ${type}`);
        }
        await connect();
        const authentication = await (
            async (type, item, author, at)=>{
                const found = await QRAuthentication.findOne(
                    {
                        authorId: author.id,
                        createdAt: {
                            $lte: at
                        },
                        expiredAt: {
                            $gt: new Date(at.getTime()+item.span/2)
                        }
                    }
                );
                if(found)
                    return found;
                return await QRAuthentication.create(
                    {
                        type,
                        authorId: author.id,
                        createdAt: at,
                        expiredAt: new Date(at.getTime()+item.span),
                        context: item.context(at)
                    }
                );
            }
        )(type, item, author, at);

        return {
            qrAuthentication: authentication.toObject(),
            rollback: async ()=>{
                return await QRAuthentication.deleteOne({_id: authentication._id});
            }
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = acquireQRAuthentication;
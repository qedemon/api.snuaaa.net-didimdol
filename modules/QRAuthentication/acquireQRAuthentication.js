const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication} = require("models");
const catalogue = require("./catalogue");

async function acquireQRAuthentication(author, type, options={}, at=getNow()){
    try{
        const item = catalogue[type];
        if(!item){
            throw new Error(`invalid type ${type}`);
        }
        await connect();
        const authentication = await (
            async (type, item, author, at, options)=>{
                const found = await QRAuthentication.findOne(
                    {
                        authorId: author.id,
                        type,
                        createdAt: {
                            $lte: at
                        },
                        expiredAt: {
                            $gt: new Date(at.getTime()+item.span/2)
                        },
                        ...(typeof(item.filter)==="function")?
                            item.filter(at, options):
                            item.filter??{}
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
                        context: item.context(at, options)
                    }
                );
            }
        )(type, item, author, at, options);

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
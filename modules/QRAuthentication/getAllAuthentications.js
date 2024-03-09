const {mongoose: {connect}} = require("Utility");
const {getNow} = require("modules/time/core");
const {QRAuthentication, QRAuthenticationLog} = require("models");
const catalogue = require("./catalogue");

async function getAllAuthentications(type){
    try{
        await connect();
        const authenticationMap = (await QRAuthentication.find(Array.isArray(type)?{type: {$in: type}}:{type}).populate("logs"))
        .filter(
            ({logs})=>logs.length
        )
        .reduce(
            (result, authentication)=>{
                const {context: {title}} = authentication;
                result.set(
                    title,
                    (
                        (title)=>{
                            const logs = result.get(title)??new Map();
                            authentication.logs.forEach(
                                (log)=>{
                                    logs.set(log.id, log);
                                }
                            )
                            return logs;
                        }
                    )(title)
                )
                return result;
            },
            new Map()
        );
        const authentications = await Promise.all(
            Array.from(authenticationMap.entries())
            .map(
                async ([title, logs])=>{
                    return {
                        title, 
                        users: (
                            await Promise.all(
                                Array.from(logs.values()).map(
                                    async (log)=>{
                                        await log.populate("user", ["id", "name", "colNo", "major", "aaaNo"]);
                                        return log.user[0]?({...log.user[0].toObject(), authenticatedAt: log.authenticatedAt}):null;
                                    }
                                )
                            )
                        )
                        .filter((user)=>user)
                    }
                }
            )
        );
        
        return {
            authentications
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = getAllAuthentications;
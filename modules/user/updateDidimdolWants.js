const {mongoose: {connect}} = require("Utility");
const {User, DidimdolClass, Log} = require("models");
const {getNow} = require("modules/time/core");
const {frontendEnv} = require("modules/frontendEnv/core");

async function updateDidimdolWants(userId, wants){
    try{
        await connect();
        const loadedEnv = await frontendEnv();
        const 수강신청일시 = ((dateString)=>dateString?new Date(dateString):null)(loadedEnv.values.수강신청일시);
        const user = await User.findOne({id: userId});
        if(!user){
            throw new Error(`no user with ID ${userId}`);
        }

        const now = getNow();
        const firstWant = await (
            async (didimdolClassId)=>{
                if(!didimdolClassId){
                    return null;
                }
                return await DidimdolClass.findById(didimdolClassId).populate("wants");
            }
        )((Array.isArray(wants) && wants.length>0)?wants[0]:null);
        const lastWants = (Array.isArray(wants) && wants.length>0)?wants.slice(1):[];

        let message = null;
        if((firstWant===null) || ((firstWant?._id?.equals) && !firstWant._id.equals(user.didimdolClass.firstWant.didimdolClass))){
            if((수강신청일시 instanceof Date) && now<수강신청일시){
                message = `신청 기간이 아님`
            }
            else if(firstWant && firstWant.wants>=firstWant.maxWant){
                message = "정원 초과";
            }
            else{
                const prev = user.didimdolClass?.firstWant?.didimdolClass;

                user.didimdolClass.firstWant={
                    ...user.didimdolClass.firstWant,
                    didimdolClass: firstWant?._id??null,
                    at: now
                }
                await Log.create(
                    {
                        message: {
                            user: {
                                name: user.name,
                                id: user.id,
                            },
                            didimdolClass: firstWant,
                            prev,
                            at: now,
                            info: "변경됨"
                        }
                    }
                )
            }
        }
        else{
            await Log.create(
                {
                    message: {
                        user: {
                            name: user.name,
                            id: user.id
                        },
                        firstWant: firstWant,
                        info: "변경되지 않음"
                    }
                }
            );
        }

        user.didimdolClass.lastWants=lastWants;
        await user.save();

        return {
            updated: user.toObject({virtuals: true}),
            message
        }
    }
    catch(error){
        return {
            error
        }
    }
}

module.exports = updateDidimdolWants
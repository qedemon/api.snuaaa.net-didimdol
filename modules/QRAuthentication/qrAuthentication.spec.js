const acquireQRAuthentication = require("./acquireQRAuthentication");
const logQRAuthentication = require("./logQRAuthentication");

test("qrAuthentication", async()=>{
    const user = {id: "novasnuaaa", name: "김태석", major: "기계"};
    const {qrAuthentication, rollback, error} = await acquireQRAuthentication(user, "디딤돌");
    if(error){
        console.log(error);
        return;
    }
    await (
        async (qrAuthentication)=>{
            const {qrAuthenticationLog, rollback, error} = await logQRAuthentication(qrAuthentication._id, user);
            if(error){
                throw error;
            }
            console.log(qrAuthenticationLog);
            console.log(await rollback());
        }
    )(qrAuthentication)
    console.log(await rollback());
})
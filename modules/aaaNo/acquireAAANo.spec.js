const acquireAAANo = require("./acquireAAANo");

test("acquireAAANo", async ()=>{
    const {aaaNo, error} = await acquireAAANo(118);
    if(error){
        throw error;
    }
    console.log(aaaNo);
});
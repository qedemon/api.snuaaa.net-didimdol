const getQRAuthentications = require("./getQRAuthentications")

test("getQRAuthentications", async ()=>{
    const {authentications, error} = await getQRAuthentications({"context.title": "2024. 3. 9. 별모임"});
    if(error){
        throw error;
    }
    console.log(JSON.stringify(authentications, null, "\t"));
})
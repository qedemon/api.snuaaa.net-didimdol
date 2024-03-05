const getAllAuthentications = require("./getAllAuthentications");

test("getAllAuthentications", async ()=>{
    const {authentications, error} = await getAllAuthentications("별모임");
    if(error){
        throw error;
    }
    console.log(authentications);
})
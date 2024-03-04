const googleAuthorize = require("./googleAuthorize");

test("googleAuthorize", async ()=>{
    console.log(await googleAuthorize());
})
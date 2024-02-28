const changePassword = require("./changePassword");
test("changePassword", async()=>{
    console.log(await changePassword("test37", "aaa1234578"));
})
require("dotenv").config();
const remoteAuthenticate = require("./remoteAuthenticate");

test("remoteAuthenticate", async()=>{
    console.log(await remoteAuthenticate(process.env.TEST_ID, process.env.TEST_PASSWORD));
})
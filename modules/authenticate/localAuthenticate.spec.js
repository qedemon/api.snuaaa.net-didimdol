require("dotenv").config();
const localAuthenticate = require("./localAuthenticate");

test("localAuthenticate", async()=>{
    const {userInfo, error} = localAuthenticate(process.env.TEST_ID, process.env.TEST_PASSWORD);
    console.log(userInfo, error);
})
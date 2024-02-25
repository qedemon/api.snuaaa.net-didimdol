const authenticate = require("./authenticate");

test("authenticate", async ()=>{
    const {error, authenticated, userInfo, token} = await authenticate("novasnuaaa", "aaa12345");
    expect((!error)&&authenticated).toBe(true);
});
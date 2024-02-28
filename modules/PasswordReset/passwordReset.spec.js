const acquirePasswordReset = require("./acquirePasswordReset");
const validatePasswordReset = require("./validatePasswordReset");

test("passwordReset", async()=>{
    const {passwordReset, error} = await acquirePasswordReset("test37");
    console.log(passwordReset);
    expect(await validatePasswordReset("test37", passwordReset.uuid)).toBe(true);
})
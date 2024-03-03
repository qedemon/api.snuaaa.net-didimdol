const getQRImage = require("./getQRImage");

test("QRImage", async()=>{
    const {qr, error} = await getQRImage(null, "register");
    if(error){
        throw error;
    }
    console.log(qr);
})
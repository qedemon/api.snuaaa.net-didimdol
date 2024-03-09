const {googleAuthorize} = require("modules/googleSheet/core");

(
    async()=>{
        const {drive} = await googleAuthorize();
        console.log(await drive.channels.stop(
            {
                resource: {
                    resourceId: 'Bxleuyt25afjsjI8dcic71BM6CI',
                }
            }
        ))
        const result = await drive.files.watch(
            {
                fileId: "15C323MvSkngqMlVVvTWmnpvco0oHw-FRbN0JrT0ga4c",
                resource: {
                    id: "qedemon-nova-snuaaa",
                    type: "web_hook",
                    address: "https://api.nova.snuaaa.net:9885/didimdol/googleSheet/"
                }
            }
        )
    }
)()
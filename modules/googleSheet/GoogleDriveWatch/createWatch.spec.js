require("dotenv").config();
const {googleAuthorize} = require("../core");
const createWatch = require("./createWatch");

test("createWatch", async ()=>{
    
    const drive = await (
        async ()=>{
            const {drive, error} = await googleAuthorize();
            if(error){
                throw error;
            }
            return drive;
        }
    )();
    const {googleDriveWatch, error: createError} = await createWatch("19_LfpHwbBgcgsgbR3s_PlwVlLcK0UEZD73BqXCDieII", drive);
    if(createError){
        console.log(createError);
        throw createError;
    }
    console.log(googleDriveWatch);
})
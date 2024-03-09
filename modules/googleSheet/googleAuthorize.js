require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const {google} = require('googleapis');

let credentials = null;

async function googleAuthorize(){
    try{
        if(!credentials){
            const content = await fs.readFile(path.join(process.cwd(), process.env.GOOGLE_OAUTH_TOKEN_PATH));
            credentials = JSON.parse(content);
        }
        const authorization = google.auth.fromJSON(credentials);
        const sheet = google.sheets({version: "v4", auth: authorization});
        const drive = google.drive({version: "v3", auth: authorization});
        return {
            authorization,
            sheet,
            drive
        }
    }
    catch(error){
        return {error};
    }
}

module.exports = googleAuthorize;
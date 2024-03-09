require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const TOKEN_PATH = path.join(process.cwd(), process.env.GOOGLE_OAUTH_TOKEN_PATH);
const CREDENTIALS_PATH = path.join(process.cwd(), process.env.GOOGLE_OAUTH_CREDENTIALS_PATH);
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.readonly"];

(
    async ()=>{
        const client = await authenticate(
            {
                scopes: SCOPES,
                keyfilePath: CREDENTIALS_PATH
            }
        );
        if(client.credentials){
            const keys = JSON.parse(await fs.readFile(CREDENTIALS_PATH));
            const key = keys.installed || keys.web;
            const payload = JSON.stringify(
                {
                    type: "authorized_user",
                    client_id: key.client_id,
                    client_secret: key.client_secret,
                    refresh_token: client.credentials.refresh_token
                }
            )
            await fs.writeFile(TOKEN_PATH, payload);
        }
    }
)()
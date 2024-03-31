require("dotenv").config();
const ws = require("ws");

let wss = null;

function aquireWebSocket(){
    if(wss===null){
        wss = new ws.Server({port: process.env.WS_SERVER_PORT});

        wss.on("connection", (ws)=>{
            ws.on("message", (message)=>{
                console.log(`Received from client : ${message}`);
                ws.send(`Server received from client: ${message}`);
            });
        });
    }
    return wss;
}

module.exports = aquireWebSocket;
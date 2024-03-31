require("dotenv").config();
const http = require("http");
const app = require("./app");
const aquireWebSocket = require("./WebSocket");

http.createServer(app).listen(process.env.SYNC_SERVER_PORT, ()=>{
    console.log(`sync server listen at ${process.env.SYNC_SERVER_PORT}`);
});
const wss = aquireWebSocket();


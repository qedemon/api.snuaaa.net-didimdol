const aquireWebSocket = require("./acquireWebSocket");

function broadcastData(data){
    const wss = aquireWebSocket();
    wss.clients.forEach(
        (client)=>{
            client.send(JSON.stringify(data));
        }
    )
}

module.exports = broadcastData;
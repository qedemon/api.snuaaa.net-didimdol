require("dotenv").config();
const fetch = require("node-fetch");
const path = require("path");

async function postData(postPath, data){
    const options = {
        method: "POST",
        mode: "cors",
        chache: "no-chache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    };
    const res = await fetch("http://"+path.join(`localhost:${process.env.SYNC_SERVER_PORT}`, postPath), options);
    return await res.json();
}

const sync = {
    async push(context){
        return await postData("push", context);
    },
    async post(context){
        return await postData("pull", context);
    }
}

module.exports = sync;
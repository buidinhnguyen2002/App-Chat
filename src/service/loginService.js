import {w3cwebsocket as W3CWebSocket} from "websocket";
const client = new W3CWebSocket('ws://140.238.54.136:8080/chat/chat');
client.onopen = ()=>{
    console.log('Websocket ')
}
client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    console.log('reply' + dataFromServer);
}
export const callAPILogin = (userName, password) => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "LOGIN",
                "data": {
                    "user": userName,
                    "pass": password,
                }
            }
        }
    ));
}
export const callAPIRegister = (userName, password) => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "REGISTER",
                "data": {
                    "user": userName,
                    "pass": password,
                }
            }
        }
    ));
}

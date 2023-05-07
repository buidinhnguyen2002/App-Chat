import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://140.238.54.136:8080/chat/chat');
client.onopen = () => {
    console.log('Websocket ')
}


client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    console.log('reply' + message.data);
    console.log(dataFromServer['status'], 'A');
}


export const callAPILogin = (userName, password) => {
    return new Promise((resolve, reject) => {
        const responseLogin = {
            status: "",
            RE_LOGIN_CODE: null,
        }
        client.send(JSON.stringify({
            "action": "onchat",
            "data": {
                "event": "LOGIN",
                "data": {
                    "user": userName,
                    "pass": password,
                }
            }
        }));
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer['event'] === 'LOGIN') {
                responseLogin['RE_LOGIN_CODE'] = dataFromServer['data']['RE_LOGIN_CODE'];
                responseLogin['status'] = dataFromServer['status'];
                resolve(responseLogin);
            }
        }
    });
}
export const callAPIGetUserList = () => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "GET_USER_LIST",
            }
        }
    ));
    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(dataFromServer);
    }
}
export const callAPILogout = () => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "LOGOUT",
            }
        }
    ));
    client.close();
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

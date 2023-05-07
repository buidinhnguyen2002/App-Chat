import {w3cwebsocket as W3CWebSocket} from "websocket";
import store from "../store/store";

const urlServer = 'ws://140.238.54.136:8080/chat/chat';
var client = new W3CWebSocket(urlServer);
client.onopen = () => {
    console.log('Websocket ')
}


client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    console.log('reply' + message.data);
    console.log(dataFromServer['status'], 'A');
}

export const reConnectionServer = () => {
    client = new W3CWebSocket(urlServer);
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
export const callAPIGetRoomChatMes = async () => {
    let isConnecting = false;
    while (true) {
        await new Promise(resolve => setTimeout(() => {
            if (client.readyState === W3CWebSocket.OPEN) {
                isConnecting = true;
                resolve();
            }
        }, 1000));
        if (isConnecting) break;
    }
    console.log(client.readyState, "Ready");
    callAPIReLogIn();
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "GET_ROOM_CHAT_MES",
                "data": {
                    "name": "",
                    "page": 1,
                }
            }
        }
    ));
    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(dataFromServer);
    }
}
export const callAPIReLogIn = () => {
    const currentStore = store.getState();
    console.log(currentStore.userReducer.keyReLogin, "Code");
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "RE_LOGIN",
                "data": {
                    "user": currentStore.userReducer.username,
                    "code": currentStore.userReducer.keyReLogin,
                }
            }
        }
    ));
    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(dataFromServer);
    }
}
const waitConnection = async () => {
    let isConnecting = false;
    while (true) {
        await new Promise(resolve => setTimeout(() => {
            if (client.readyState === W3CWebSocket.OPEN) {
                isConnecting = true;
                resolve();
            }
        }, 1000));
        if (isConnecting) break;
    }
}
export const callAPIGetUserList = async () => {
    await waitConnection();
    return new Promise((resolve, reject) => {
        let responseListChat = [];
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
            responseListChat = dataFromServer['data'];
            resolve(responseListChat);
        }
    })
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

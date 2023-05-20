import {w3cwebsocket as W3CWebSocket} from "websocket";
import store from "../store/store";

const urlServer = 'ws://140.238.54.136:8080/chat/chat';
export var client = new W3CWebSocket(urlServer);
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
}
export const callAPIGetRoomChatMes = (roomName) => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "GET_ROOM_CHAT_MES",
                "data": {
                    "name": roomName,
                    "page": 1,
                }
            }
        }
    ));
}
export const callAPIGetPeopleChatMes = (name) => {
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": name,
                    "page": 1,
                }
            }
        }
    ));
}

export const callAPIReLogIn = () => {
    const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
    client.send(JSON.stringify(
        {
            "action": "onchat",
            "data": {
                "event": "RE_LOGIN",
                "data": {
                    "user": dataReLogIn.userName,
                    "code": dataReLogIn.keyReLogIn,
                }
            }
        }
    ));
}
export const waitConnection = async () => {
    let isConnecting = false;
    while (true) {
        await new Promise(resolve => setTimeout(() => {
            if (client.readyState === W3CWebSocket.OPEN) {
                isConnecting = true;
                resolve("");
            }
        }, 100));
        if (isConnecting) break;
    }
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
    sessionStorage.removeItem('dataReLogIn');
    sessionStorage.removeItem("isLogIn");
    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(dataFromServer, "LOG");
    }
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
export const callAPICreateRoomChat = (roomName) => {
    client.send(JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "CREATE_ROOM",
            "data": {
                "name": roomName,
            }
        }
    }));
}

export const callAPIJoinRoomChat = (roomName) => {
    client.send(JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "JOIN_ROOM",
            "data": {
                "name": roomName,
            }
        }
    }));
}

export const callAPISendChatRoom = (to, mes)=>{
    client.send(JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "SEND_CHAT",
            "data": {
                "type": "room",
                "to": to,
                "mes": mes,
            }
        }
    }));
}
export const callAPICheckUser = ()=>{
    client.send(JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "CHECK_USER",
            "data": {
                "user": "nguyen................................"
            }
        }
    }));
}
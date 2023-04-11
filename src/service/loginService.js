import {w3cwebsocket as W3CWebSocket} from "websocket";
const client = new W3CWebSocket('ws://140.238.54.136:8080/chat/chat');
export const callAPILogin = (userName, password) => {
    client.onopen = ()=>{
        console.log('Websocket ')
    }
}
export const callAPIRegister = (userName, password) => {

}

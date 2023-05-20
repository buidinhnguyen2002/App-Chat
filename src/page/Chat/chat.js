import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPICheckUser,
    callAPICreateRoomChat, callAPIGetPeopleChatMes,
    callAPIGetRoomChatMes,
    callAPIGetUserList, callAPIJoinRoomChat,
    callAPIReLogIn, client,
    reConnectionServer, waitConnection
} from "../../service/loginService";
import {testCallAPIReLogIn, testReConnectionServer} from "../../service/APIService";
import {useDispatch, useSelector} from "react-redux";
import {receiveChat, saveListChat, saveToListChatsDetail, saveToListChatsPeople} from "../../store/actions/userAction";
import listChats from "../../components/list_chats/list-chats";

function ChatPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = sessionStorage.getItem('isLogIn');
        if (!isLogin) {
            navigate('/');
            return;
        }
        async function f() {
            await waitConnection();
            callAPIReLogIn();
            callAPIGetUserList();
            let listChats = [];
            let chatsRoom = [];
            let chatPeople = [];
            let countChat = 0;
            await new Promise((resolve)=> {
                client.onmessage = (message) => {
                    const dataFromServer = JSON.parse(message.data);
                    if (dataFromServer['event'] === 'RE_LOGIN') {
                        const dataFromServer = JSON.parse(message.data);
                        const dataReLogIn = JSON.parse(sessionStorage.getItem('dataReLogIn'));
                        console.log(dataFromServer, "RELO");
                        dataReLogIn.keyReLogIn = dataFromServer['data']?.['RE_LOGIN_CODE'];
                        sessionStorage.setItem('dataReLogIn', JSON.stringify(dataReLogIn));
                    }
                    if(dataFromServer['event'] === 'GET_USER_LIST'){
                        const responseListChat = dataFromServer['data'];
                        dispatch(saveListChat(responseListChat));
                        listChats = responseListChat;
                        resolve();
                    }
                }
            })

            for (let i = 0; i < listChats.length; i++) {
                const name = listChats[i].name;
                const type = listChats[i].type;
                if (type === 1) {
                    callAPIGetRoomChatMes(name);
                }
                if (type === 0) {
                    callAPIGetPeopleChatMes(name);
                }
            }
            await new Promise((resolve) => {
                client.onmessage = (message) => {
                    const dataFromServer = JSON.parse(message.data);
                    if(dataFromServer['event'] === 'GET_PEOPLE_CHAT_MES' ){
                        let chatData = dataFromServer['data'];
                        if(chatData.length !== 0){
                            let chatObj = {
                                name: chatData[0].to,
                                type: chatData[0].type,
                                chatData: chatData,
                            };
                            chatPeople.push(chatObj);
                        }
                        countChat++;
                    }
                    if(dataFromServer['event'] === 'GET_ROOM_CHAT_MES'){
                        chatsRoom.push(dataFromServer['data']);
                        countChat++;
                    }
                    if (countChat === listChats.length) {
                        resolve();
                    }
                };
            });
            dispatch(saveToListChatsDetail(chatsRoom));
            dispatch(saveToListChatsPeople(chatPeople));
            callAPICheckUser();
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log(dataFromServer, 'check user')
                const dataMessage = dataFromServer['data'];
                const date = new Date();
                const newTime = date.getFullYear()+ '-'+ date.getMonth() + '-'+ date.getDay() + ' ' + date.getHours()
                    + ':' + date.getMinutes()+':' + date.getSeconds();
                dataMessage.createAt = newTime;
                if(dataFromServer['event'] === 'SEND_CHAT'){
                    dispatch(receiveChat(dataMessage));
                }
            }
        }
        f();
    }, []);
    return (
        <div className={"page-chat"}>
            <NavigationBar/>
            <div className="detail">
                <Outlet/>
            </div>
        </div>
    )
}


export default ChatPage;
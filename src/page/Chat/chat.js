import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPICreateRoomChat,
    callAPIGetRoomChatMes,
    callAPIGetUserList, callAPIJoinRoomChat,
    callAPIReLogIn, client,
    reConnectionServer, waitConnection
} from "../../service/loginService";
import {testCallAPIReLogIn, testReConnectionServer} from "../../service/APIService";
import {useDispatch} from "react-redux";
import {saveListChat} from "../../store/actions/userAction";

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
                    console.log(dataFromServer, "CHAT");
                    dispatch(saveListChat(responseListChat));
                }
            }
        }

        f();
    }, [navigate]);
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
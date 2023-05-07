import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {
    callAPIGetRoomChatMes,
    callAPIGetUserList,
    callAPIReLogIn,
    reConnectionServer
} from "../../service/loginService";
import {testCallAPIReLogIn, testReConnectionServer} from "../../service/APIService";
import {useDispatch} from "react-redux";
import {saveListChat} from "../../store/actions/userAction";

function ChatPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem('isLogIn');
        if (!isLogin) {
            navigate('/');
            return;
        }
        async function f() {
            const response = await callAPIGetUserList();
            dispatch(saveListChat(response));
        }
        f();
        // dispatch()
        // callAPIGetRoomChatMes().then(r => r);
        return ()=> {

        }
    },[]);

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
import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect, useNavigate, Outlet} from "react-router-dom";
import {callAPIGetUserList} from "../../service/loginService";

function ChatPage(props) {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem('isLogIn');
        if (!isLogin) {
            navigate('/');
            return;
        }
        callAPIGetUserList();
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
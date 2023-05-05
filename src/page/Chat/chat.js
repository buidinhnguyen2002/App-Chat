import React, {useEffect} from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect, useNavigate} from "react-router-dom";

function ChatPage(props) {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem('isLogIn');
        console.log(isLogin)
        if (!isLogin) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div className={"page-chat"}>
            <NavigationBar/>
            <ListChats/>
            <WindowChat/>
        </div>
    )
}


export default ChatPage;
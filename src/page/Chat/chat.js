import React from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";
import WindowChat from "../../components/chat_window/chat_window";
import {redirect} from "react-router-dom";

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={"page-chat"}>
                <NavigationBar/>
                <ListChats/>
                <WindowChat/>
            </div>
        )
    }
}


export default ChatPage;
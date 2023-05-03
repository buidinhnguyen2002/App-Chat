import React from "react";
import "./chat.scss";
import NavigationBar from "../../components/navigation_bar/navigation_bar";
import ListChats from "../../components/list_chats/list-chats";

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        }
    }
    render() {
        return (
            <div className={"page-chat"}>
                <NavigationBar/>
                <ListChats/>
            </div>
        )
    }
}


export default ChatPage;
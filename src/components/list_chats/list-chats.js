import React from "react";
import "./list_chat.scss";
import HeaderChat from "../header/header-chat";
import SearchBar from "../search_bar/search_bar";
import Archive_item from "../archive-item/archive_item";
import ArchiveItem from "../archive-item/archive_item";
import Chat_item from "../chat_item/chat_item";
import ChatItem from "../chat_item/chat_item";

class ListChats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        }
    }
    render() {
        return (
            <div className={"list_chats"}>
                <div className="header_chat">
                    <HeaderChat/>
                </div>
                <SearchBar/>
                <div className="archive_item">
                    <ArchiveItem/>
                </div>
                <div className="horizontal-line"></div>
                <div className="chats">
                    <h4 className={"chats-title"}>All Chats</h4>
                    <div className="chats_container">
                        <div className="chat-item">
                            <ChatItem isChoose={true}/>
                        </div>
                        <div className="chat-item">
                            <ChatItem />
                        </div>
                        <div className="chat-item">
                            <ChatItem />
                        </div>
                        <div className="chat-item">
                            <ChatItem />
                        </div>
                        <div className="chat-item">
                            <ChatItem />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ListChats;
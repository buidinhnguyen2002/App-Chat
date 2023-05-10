import React, {useEffect, useState} from "react";
import "./list_chat.scss";
import HeaderChat from "../header/header-chat";
import SearchBar from "../search_bar/search_bar";
import ArchiveItem from "../archive-item/archive_item";
import ChatItem from "../chat_item/chat_item";
import {useDispatch, useSelector} from "react-redux";
import chat from "../../page/Chat/chat";
import {callAPIGetRoomChatMes, client, waitConnection} from "../../service/loginService";
import {saveToListChatsDetail} from "../../store/actions/userAction";

function ListChats(props) {
    const listChats = useSelector(state =>  state.userReducer.chats);
    const [chatIndex, setChatIndex] = useState(0);
    function changeChatIndex(index) {
        setChatIndex(index);
    }
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
                    {typeof listChats !== 'undefined' && Array.isArray(listChats) ? listChats.map((chatItem,index) => (
                        <div className="chat-item" onClick={()=>changeChatIndex(index)}>
                            <ChatItem type={chatItem.type} name={chatItem.name} isChoose={chatIndex == index ? true : false} />
                        </div>
                    )): <div></div>}
                </div>
            </div>
        </div>
    )
}


export default ListChats;
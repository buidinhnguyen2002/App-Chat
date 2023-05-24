import React, {useEffect, useState} from "react";
import "./list_chat.scss";
import HeaderChat from "../header/header-chat";
import SearchBar from "../search_bar/search_bar";
import ArchiveItem from "../archive-item/archive_item";
import ChatItem from "../chat_item/chat_item";
import {useDispatch, useSelector} from "react-redux";
import chat from "../../page/Chat/chat";
import {callAPIGetPeopleChatMes, callAPIGetRoomChatMes, client, waitConnection} from "../../service/loginService";
import {changeCurrentChat, saveToListChatsDetail} from "../../store/actions/userAction";
import CreateAndjoinRoom from "../rooms/createAndjoinRoom";

function ListChats(props) {
    const listChats = useSelector(state =>  state.userReducer.chats);
    const [chatIndex, setChatIndex] = useState(0);
    const dispatch = useDispatch();
    function changeChatIndex(index,e) {
        setChatIndex(index);
        const nameChat = e.target.getAttribute('name');
        const type = e.target.getAttribute('type');
        dispatch(changeCurrentChat(nameChat, Number(type)));
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
            <div className="rooms">
                <CreateAndjoinRoom/>
            </div>
            <div className="horizontal-line"></div>
            <div className="chats">
                <h4 className={"chats-title"}>All Chats</h4>
                <div className="chats_container">
                    {typeof listChats !== 'undefined' && Array.isArray(listChats) ? listChats.map((chatItem,index) => (
                        <div key={chatItem.actionTime} name={chatItem.name} type={chatItem.type} className="chat-item" onClick={(e)=>changeChatIndex(index,e)}>
                            <ChatItem type={chatItem.type} name={chatItem.name} isChoose={chatIndex == index ? true : false} />
                        </div>
                    )): <div></div>}
                </div>
            </div>
        </div>
    )
}


export default ListChats;
import ListChats from "../list_chats/list-chats";
import WindowChat from "../chat_window/chat_window";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAPIGetPeopleChatMes, callAPIGetRoomChatMes, client} from "../../service/loginService";
import {saveToListChatsDetail} from "../../store/actions/userAction";

export default function ChatDetail(props) {
    return <>
        <ListChats/>
        <WindowChat/>
    </>
}
import ListChats from "../list_chats/list-chats";
import WindowChat from "../chat_window/chat_window";
import React from "react";

export default function ChatDetail(props) {
    return <>
        <ListChats/>
        <WindowChat/>
    </>
}
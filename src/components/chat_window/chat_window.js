import React, {useEffect, useRef} from "react";
import "./chat_window.scss";
import ChatDetailHeader from "../chat_detail_header/chat_detail_header";
import InputMessage from "../message-page/input_message";
import {useDispatch, useSelector} from "react-redux";
import {callAPIGetPeopleChatMes, callAPIGetRoomChatMes, client} from "../../service/loginService";
import {saveToListChatsDetail} from "../../store/actions/userAction";
import {useNavigate} from "react-router-dom";
import MessageItem from "../message/message_item";
import chat from "../../page/Chat/chat";

function WindowChat(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const chatData = currentChats !== null ? [...currentChats.chatData].reverse(): [];
    const dispatch = useDispatch();
    const scrollTargetRef = useRef(null);
    useEffect(() => {
        if (scrollTargetRef.current) {
            console.log(scrollTargetRef.current, "day ne")
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, );
    return (
        <div className={"window-chat"}>
            <div className="window-chat-header">
                <ChatDetailHeader/>
            </div>
            <div className="window-chat-body d-flex" style={{flexDirection: "column"}}>
                {
                    chatData.map((msg,index)=> (
                        <div ref={(chatData.length-1) === index ? scrollTargetRef: null} className={'msgItem'+ `${(chatData.length-1) === index ? " alo": ' loa'}`} key={msg.id}>
                            <MessageItem key={msg.id} name={msg.name} mes={msg.mes}/>
                        </div>
                    ))
                }
            </div>
            <InputMessage/>
        </div>
    )
}


export default WindowChat;
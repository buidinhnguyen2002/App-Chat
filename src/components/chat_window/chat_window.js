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
    let chatData = [];
    if(currentChats !== null && currentChats?.chatData){
        chatData = [...currentChats.chatData].reverse()
    }
    const dispatch = useDispatch();
    const scrollTargetRef = useRef(null);
    useEffect(() => {
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, );


    function handleClickMessage(message){
        console.log(message);
        callAPIGetPeopleChatMes(message.name)
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(dataFromServer);
        }
    }

    return (
        <div className={"window-chat"}>
            <div className="window-chat-header">
                <ChatDetailHeader/>
            </div>
            <div className="window-chat-body d-flex" style={{flexDirection: "column"}}>
                {
                    chatData.map((msg,index)=> (
                        <div onClick={()=>handleClickMessage(msg)} ref={(chatData.length-1) === index ? scrollTargetRef: null} className={'msgItem'+ `${(chatData.length-1) === index ? " alo": ' loa'}`} key={msg.id}>
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
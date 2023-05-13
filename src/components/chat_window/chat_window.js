import React, {useEffect} from "react";
import "./chat_window.scss";
import ChatDetailHeader from "../chat_detail_header/chat_detail_header";
import InputMessage from "../message-page/input_message";
import {useDispatch, useSelector} from "react-redux";
import {callAPIGetPeopleChatMes, callAPIGetRoomChatMes, client} from "../../service/loginService";
import {saveToListChatsDetail} from "../../store/actions/userAction";
import {useNavigate} from "react-router-dom";
import MessageItem from "../message/message_item";

function WindowChat(props) {
    const currentChats = [...useSelector(state => state.userReducer.currentChat)].reverse();
    const dispatch = useDispatch();
    useEffect(() => {

    }, []);
    return (
        <div className={"window-chat"}>
            <div className="window-chat-header">
                <ChatDetailHeader/>
            </div>
            <div className="window-chat-body d-flex" style={{flexDirection: "column"}}>
                {
                    currentChats.map((msg,index)=> (
                        <div className={'msgItem'} key={msg.id}>
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
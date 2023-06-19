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
import {isJSON} from "../../util/function";
import ImageBackground from "../../Assets/Image/Call Service.png";

function WindowChat(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const chats = useSelector(state => state.userReducer.chats);
    const chatData = currentChats ? [...currentChats.chatData].reverse() : [];
    const dispatch = useDispatch();
    const scrollTargetRef = useRef(null);
    useEffect(() => {
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({behavior: 'smooth'});
        }
    },);
    const decodeEntities = (text) => {
        const element = document.createElement("textarea");
        element.innerHTML = text;
        return element.value;
    };

    const convertEntitiesToEmoji = (text) => {
        if (isJSON(text)) {
            const parsedText = JSON.parse(text);
            if (parsedText.text) {
                return decodeEntities(parsedText.text);
            }
        }
        return decodeEntities(text);
    };

    return (
        chats.length === 0 ? <div className="chat_setting-detail">
            <img src={ImageBackground} alt=""/>
        </div> : <div className={"window-chat"}>
                <div className="window-chat-header">
                    <ChatDetailHeader/>
                </div>
                <div className="window-chat-body d-flex" style={{flexDirection: "column"}}>
                    {chatData.map((msg, index) => (
                        <div ref={chatData.length - 1 === index ? scrollTargetRef : null}
                             className={"msgItem" + `${chatData.length - 1 === index ? " alo" : " loa"}`} key={msg.id}>
                            <MessageItem key={msg.id} name={msg.name}  type={msg.type} mes={msg.mes} createAt={msg.createAt}/>
                        </div>
                    ))}
                </div>
                <InputMessage/>
            </div>
    );
}

export default WindowChat;
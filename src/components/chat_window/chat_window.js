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

function WindowChat(props) {
    const currentChats = useSelector(state => state.userReducer.currentChat);
    const chatData = currentChats !== null ? [...currentChats.chatData].reverse() : [];
    const dispatch = useDispatch();
    const scrollTargetRef = useRef(null);
    useEffect(() => {
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({behavior: 'smooth'});
        }
    },);

    // function isJSON(str) {
    //     try {
    //         const searchStrings = ["{", "}", "[", "]", "text", "imgs"];
    //         for (const searchStringsKey of searchStrings) {
    //             if (!str.includes(searchStringsKey)) return false;
    //         }
    //         JSON.parse(str);
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }

    return (
        <div className={"window-chat"}>
            <div className="window-chat-header">
                <ChatDetailHeader/>
            </div>
            <div className="window-chat-body d-flex" style={{flexDirection: "column"}}>
                {
                    chatData.map((msg, index) => (
                        isJSON(msg.mes) ? <div ref={(chatData.length - 1) === index ? scrollTargetRef : null}
                                               className={'msgItem'}
                                               key={msg.id}>
                                <MessageItem key={msg.id} name={msg.name} mes={msg.mes} isJson={true}/>
                            </div> :
                            <div ref={(chatData.length - 1) === index ? scrollTargetRef : null}
                                 className={'msgItem'}
                                 key={msg.id}>
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
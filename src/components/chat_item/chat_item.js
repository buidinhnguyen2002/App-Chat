import React, {useEffect, useState} from "react";
import "./chat_item.scss";
import ChatPeople from "../../Assets/Image/chat_people.jpg";
import {callAPIGetRoomChatMes, client, waitConnection} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {saveToListChatsDetail} from "../../store/actions/userAction";
import {
    isJoinRoomMeeting,
    isJSON,
    isLeaveRoomMeeting,
    isMeetingEnd,
    isRejectRoomMeeting,
    isVideo
} from "../../util/function";
function ChatItem(props) {
    const [isChoose, setIsChoose] = useState(props.isChoose);
    const [type, setType] = useState(props.type);
    const [name, setName] = useState(props.name);
    const dispatch = useDispatch();
    let chatData = useSelector(state => type == 1 ? state.userReducer.chatsRoom.find(chat=> chat && chat.name === name) : state.userReducer.chatsPeople.find(chat=> chat && chat.name === name));
    const myName = useSelector(state => state.userReducer.username);
    let newMess = null;
    let timeShort = "";
    if(chatData) {
        if(chatData.chatData[0]){
            newMess = chatData.chatData[0];
            let arrTime = newMess.createAt.split(" ");
            let fullTime = arrTime[1];
            timeShort = fullTime.substring(0, fullTime.length-3);
        }
    }
    const decodeEntities = (encodedString) => {
        const elem = document.createElement("div");
        elem.innerHTML = encodedString;
        return elem.innerText;
    };
    const getMessageVideoCall = (isMyChat,mesText, ownChat, type, to) => {
        const owner = (isMyChat ? 'Bạn ' : type === 1 ?ownChat+ '': '');
        if(isMeetingEnd(mesText)) return ' Cuộc gọi video đã kết thúc.';
        if(isJoinRoomMeeting(mesText)) return owner + ' đã tham gia đoạn chat video.';
        if(isRejectRoomMeeting(mesText)) return  owner + ' đã từ chối tham gia đoạn chat video.';
        if(isLeaveRoomMeeting(mesText)) return owner + ' đã rời khỏi đoạn chat video.';
        return  null;
    }
    function getNewMessage(msg, ownChat, type, to){
        const isMyChat = ownChat === myName;
        if(isVideo(msg)) return (isMyChat ? 'Bạn ' : type === 1 ?ownChat+ ': ': '') + 'đã gửi 1 video.';
        const getMessageMeeting = getMessageVideoCall(isMyChat, msg, ownChat, type, to);
        if(getMessageMeeting != null) return getMessageMeeting;
        if(!isJSON(msg)) return (isMyChat ? 'Bạn: ' : type === 1 ? ownChat+ ": " : '') + msg;
        const msgObject = JSON.parse(msg);
        if (msgObject.text === "" && msgObject.imgs.length > 0)
            return (
                (isMyChat ? "Bạn đã gửi " : type === 1 ? ownChat + " đã gửi " : "") +
                ` ${msgObject.imgs.length} hình ảnh.`
            );
        return (
            (isMyChat ? "Bạn: " : type === 1 ? ownChat + ": " : "") +
            decodeEntities(msgObject.text) // Giải mã mã HTML entities thành emoji
        );
    }

    useEffect(()=>{
    },[])

        return (
            <div className={`chat_item chat_item-round d-flex ${props.isChoose ? 'chat_item-bgBlue':'chat_item-bgWhite'}`}>
                <div className="chat_avatar-wrapper">
                    <div className="chat_avatar chat_avatar-circle">
                        <div className="img-wrapper">
                            <img src={props.type == 1 ? ChatPeople : "data:image/jpeg;base64,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"} alt=""/>
                        </div>
                    </div>
                    <span className="chat_status chat_status-active"></span>
                </div>
                <div className="chat-wrapper">
                    <div className="chat_content-wrapper">
                        <div className="chat_name ">
                            <h4 className={`${props.isChoose ? 'chat_name-clWhite':'chat_name-clBlack'}`}>{props.name}</h4>
                        </div>
                        <div className="chat_message">
                            <h5 className={`${props.isChoose ? 'chat_message-clWhite':'chat_message-clGrey'}`}>{newMess != null ?  getNewMessage(newMess.mes, newMess.name, newMess.type, newMess.to): ""}</h5>
                        </div>
                    </div>
                    <div className="chat_time">
                        <span className={`${props.isChoose ? 'chat_time-clWhite':'chat_time-clGrey'}`}>{timeShort}</span>
                        <div style={{visibility: props.isChoose ? "hidden": "visible"}} className="num-unread-message">
                            <span>2</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default ChatItem;
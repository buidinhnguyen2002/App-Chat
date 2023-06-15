import React, {useEffect, useState} from "react";
import "./chat_item.scss";
import ChatPeople from "../../Assets/Image/chat_people.jpg";
import {callAPIGetRoomChatMes, client, waitConnection} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {saveToListChatsDetail} from "../../store/actions/userAction";
import {
    getAvatar,
    isJoinRoomMeeting, isJoinRoomMeetingAudio,
    isJSON,
    isLeaveRoomMeeting, isLeaveRoomMeetingAudio,
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
    const peopleAvarars = useSelector(state => state.userReducer.avatarPeople);
    const groupAvatars =  useSelector(state => state.userReducer.avatarGroups);
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
    const getMessageVideoCall = (isMyChat,mesText, ownChat, type, to) => {
        const owner = (isMyChat ? 'Bạn ' : type === 1 ?ownChat+ '': '');
        if(isMeetingEnd(mesText)) return ' Cuộc gọi video đã kết thúc.';
        if(isJoinRoomMeetingAudio(mesText)) return owner + ' đã tham gia cuộc gọi.';
        if(isJoinRoomMeeting(mesText)) return owner + ' đã tham gia đoạn chat video.';
        if(isRejectRoomMeeting(mesText)) return  owner + ' đã từ chối tham gia đoạn chat video.';
        if(isLeaveRoomMeetingAudio(mesText)) return owner + ' đã rời khỏi cuộc gọi.';
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
        if(msgObject.text === '' && msgObject.imgs.length > 0) return (isMyChat ? 'Bạn đã gửi ' : type === 1 ? ownChat+ ' đã gửi ' : '') + ` ${msgObject.imgs.length} hình ảnh.`;
        return (isMyChat ? 'Bạn: ' : type === 1 ? ownChat+ ": " : '') + msgObject.text;
    }
    useEffect(()=>{
    },[])
        return (
            <div className={`chat_item chat_item-round d-flex ${props.isChoose ? 'chat_item-bgBlue':'chat_item-bgWhite'}`}>
                <div className="chat_avatar-wrapper">
                    <div className="chat_avatar chat_avatar-circle" style={{border: props.isChoose ? 'none':''}}>
                        <div className="img-wrapper">
                            <img src={getAvatar(props.type, peopleAvarars, groupAvatars, props.name)} alt=""/>
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
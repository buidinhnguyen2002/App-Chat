import React, {useEffect, useState} from "react";
import "./chat_item.scss";
import ChatPeople from "../../Assets/Image/chat_people.jpg";
import {callAPIGetRoomChatMes, client, waitConnection} from "../../service/loginService";
import {useDispatch, useSelector} from "react-redux";
import {saveToListChatsDetail} from "../../store/actions/userAction";
import {
    getAvatar, getNameChat, isAcceptCall, isAudioCall, isAudioCallFailed, isConnectChatPeople, isJoinGroup,
    isJoinRoomMeeting, isJoinRoomMeetingAudio,
    isJSON,
    isLeaveRoomMeeting, isLeaveRoomMeetingAudio,
    isMeetingEnd, isRejectCallPeople,
    isRejectRoomMeeting, isRequestAudioCall, isRequestCall, isUpdateGroupAvatar, isUpdateGroupName,
    isVideo, isVideoCall, isVideoCallFailed
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
    const groupNickName = useSelector(state => state.userReducer.nickNameGroups);
    const peopleNickName = useSelector(state => state.userReducer.nickNamePeople);
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
        if(isVideoCallFailed(mesText)) return (isMyChat ? to : 'Bạn') + ' đã từ chối cuộc gọi video.';
        if(isAudioCallFailed(mesText)) return (isMyChat ? to : 'Bạn') + ' đã từ chối cuộc gọi thoại.';
        if(isRejectCallPeople(mesText)) return  (ownChat === myName ? 'Bạn' : ownChat) + ' đã từ chối cuộc gọi.';
        if(isAcceptCall(mesText)) return (ownChat === myName ? 'Bạn' : ownChat) + ' đã chấp nhận cuộc gọi.'
        if(isRequestCall(mesText)) return ownChat + ' đang gọi video cho bạn.';
        if(isRequestAudioCall(mesText)) return ownChat + ' đang gọi cho bạn.';
        if(isMeetingEnd(mesText)) return ' Cuộc gọi đã kết thúc.';
        if(isJoinRoomMeetingAudio(mesText)) return owner + ' đã tham gia cuộc gọi.';
        if(isJoinRoomMeeting(mesText)) return owner + ' đã tham gia đoạn chat video.';
        if(isRejectRoomMeeting(mesText)) return  owner + ' đã từ chối tham gia đoạn chat video.';
        if(isLeaveRoomMeetingAudio(mesText)) return owner + ' đã rời khỏi cuộc gọi.';
        if(isLeaveRoomMeeting(mesText)) return owner + ' đã rời khỏi đoạn chat video.';
        return  null;
    }
    function getNewMessage(msg, ownChat, type, to){
        const isMyChat = ownChat === myName;
        if(isJoinGroup(msg)) return (isMyChat ? 'Bạn ' : ownChat) + ' đã tham gia nhóm.';
        if(isConnectChatPeople(msg)) return 'Giờ đây, các bạn có thể gọi và nhắn tin cho nhau.';
        if(isUpdateGroupName(msg)) return (isMyChat ? 'Bạn ' : ownChat) + ' đã thay đổi tên nhóm.';
        if(isUpdateGroupAvatar(msg)) return (isMyChat ? 'Bạn ' : ownChat) + ' đã thay đổi ảnh nhóm.';
        if(isAudioCall(msg)) return (isMyChat ? 'Bạn ' : ownChat) + ' đã gọi cho ' + (to === myName ? 'bạn.': to);
        if(isVideoCall(msg)) return (isMyChat ? 'Bạn ' : ownChat) + ' đã gọi video cho ' + (to === myName ? 'bạn.': to);
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
                            <h4 className={`${props.isChoose ? 'chat_name-clWhite':'chat_name-clBlack'}`}>{getNameChat(props.type === 0 ? 0 : 1, peopleNickName, groupNickName, props.name)}</h4>

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
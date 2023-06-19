import React, {useState} from "react";
import "./message_item.scss";
import {useDispatch, useSelector} from "react-redux";
import {saveAs} from 'file-saver';
import {HEADER_MSG_VIDEO, USER_AVATAR_HOLDER} from "../../util/constants";
import {
    getCurrentTimeHourAndMinute,
    getMeetingRoom, getMeetingRoomAudio, getTimeHourAndMinute,
    getURLVideo, isAcceptCall, isAudioCall, isAudioCallFailed, isConnectChatPeople,
    isJoinRoomMeeting, isJoinRoomMeetingAudio, isJSON,
    isLeaveRoomMeeting, isLeaveRoomMeetingAudio, isLink, isMeetingEnd, isRejectCallPeople,
    isRejectRoomMeeting, isRequestAudioCall, isRequestCall, isUpdateGroupAvatar, isUpdateGroupName,
    isVideoCall, isVideoCallFailed
} from "../../util/function";
import {setAudioCall, setMeetingRoom} from "../../store/actions/meetingAction";
import {getMeetingAndToken, getRoom} from "../../service/VideoCallService";
import LinkPreview from "../link_review/link_preview";

function MessageItem(props) {
    const nameChat = useSelector(state => state.userReducer.currentChat.name);
    const myName = useSelector(state => state.userReducer.username);
    const avatarAuthorMessage = useSelector(state => state.userReducer.avatarPeople).find(avatar => avatar.name === props.name);
    const urlAvatar = avatarAuthorMessage ? avatarAuthorMessage.urlAvatar : USER_AVATAR_HOLDER;
    const meetingRoom =useSelector(state => state.meetingReducer.meetingRoom);
    let listImg = [];
    if (isJSON(props.mes)) {
        try {
            listImg = JSON.parse(props.mes).imgs;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    let mesText = isJSON(props.mes) ? JSON.parse(props.mes).text : props.mes;
    const [imgDetail, setImgDetail] = useState('');
    const [videoDetail, setVideoDetail] = useState('');
    const [showImageDetail, setShowImageDetail] = useState(false);
    const [showVideoDetail, setShowVideoDetail] = useState(false);
    const video = getURLVideo(mesText);
    const videoCall = isVideoCall(mesText) ? getMeetingRoom(mesText): null;
    const audioCall = isAudioCall(mesText) ? getMeetingRoomAudio(mesText): null;
    const videoCallFailed = isVideoCallFailed(mesText);
    const audioCallFailed = isAudioCallFailed(mesText);
    const dispatch = useDispatch();
    const setURLImageDetail = (e) => {
        console.log("vao r")
        setImgDetail(e.target.src);
        setShowImageDetail(true);
    }
    const setURLVideoDetail = (e) => {
        setVideoDetail(e.target.src);
        setShowVideoDetail(true);
    }
    const closeImageDetail = () => {
        setImgDetail('');
        setShowImageDetail(false);
    }
    const dowloadImage = () => {
        fetch(imgDetail, {mode: "cors"}).then((response) => response.blob()).then((blob) => {
           saveAs(blob, 'image.png');
        });
    }
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
    const getMessage = () => {
        const owner = (props.name === myName ? 'Bạn ':props.name);
        if(isUpdateGroupName(mesText)) return owner + ' đã thay đổi tên nhóm.';
        if(isUpdateGroupAvatar(mesText)) return owner + ' đã thay đổi ảnh nhóm.';
        if(isConnectChatPeople(mesText)) return 'Giờ đây, các bạn có thể gọi và nhắn tin cho nhau.';
        if(isMeetingEnd(mesText)) return ' Cuộc gọi đã kết thúc.';
        if(isRejectCallPeople(mesText)) return  '';
        if(isRequestCall(mesText)) return '';
        if(isRequestAudioCall(mesText)) return '';
        if(isAcceptCall(mesText)) return '';
        if(isRejectRoomMeeting(mesText)) return  owner + ' đã từ chối tham gia đoạn chat video.';
        if(isJoinRoomMeetingAudio(mesText)) return owner + ' đã tham gia cuộc gọi.';
        if(isJoinRoomMeeting(mesText)) return owner + ' đã tham gia đoạn chat video.';
        if(isLeaveRoomMeetingAudio(mesText)) return owner + ' đã rời khỏi cuộc gọi.';
        if(isLeaveRoomMeeting(mesText)) return owner + ' đã rời khỏi đoạn chat video.';
        return  null;
    }
    const getTitleCall = () => {
        const owner = (props.name === myName ? 'Bạn ':props.name);
        if(audioCallFailed) return 'Đã bỏ lỡ cuộc gọi thoại.';
        if(videoCallFailed) return 'Đã bỏ lỡ cuộc gọi video.';
        if(videoCall != null) return 'Cuộc gọi video';
        if(audioCall != null) return 'Cuộc gọi thoại.';
        return null;
    }
    const getIconCall = ()=> {
        if(audioCallFailed) return <i className="bi bi-telephone" style={{fontSize: "22px"}}></i>;
        if(videoCallFailed) return <i className="fa-solid fa-video" ></i>;
        if(audioCall) return <i className="bi bi-telephone" style={{fontSize: "22px"}}></i>;
        if(videoCall) return <i className="fa-solid fa-video" ></i>;
    }
    const handelJoinVideoCall = (meetingRoom) => {
        getRoom(meetingRoom.meetId).then(data =>{
            if(data.disabled){
                getMeetingAndToken(null).then(meetId => {
                    const meetingRoom = {
                        meetId,
                        meetingName: nameChat,
                        owner: myName,
                        participants: [myName],
                        newRoom: true,
                    };
                    dispatch(setMeetingRoom(meetingRoom));
                })
            }else {
                meetingRoom.participants = [myName];
                meetingRoom.join = true;
                dispatch(setMeetingRoom(meetingRoom));
                if(!videoCall) dispatch(setAudioCall(true));
            }
        } );
    }
    return (
        <div>
            {listImg.length !== 0 && <div className={`message_container image_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                {props.name !== myName && <div className="message_avatar">
                    <img src={urlAvatar} alt=""/>
                    {/*<img src="data:image/jpeg;base64,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" alt=""/>*/}
                </div>}
                 <div className={'flex-container d-flex'}>
                    {listImg.map((img, index) => <div key={index} className={"image_item"}><img src={img} alt="" onClick={setURLImageDetail}/></div>)}
                </div>
                {(props.name !== myName &&props.type === 1) && (<span className={"author_chat"}>{props.name}</span>)}
            </div>}
            {video !== '' ? <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                {props.name !== myName && <div className="message_avatar">
                    <img src={urlAvatar} alt=""/>
                    {/*<img src="data:image/jpeg;base64,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" alt=""/>*/}
                </div>}
                <div
                    className={`message_item-video message_item-video-round`}>
                    <video controls>
                        <source src={video} type={"video/mp4"}/>
                    </video>
                </div>
                {(props.name !== myName &&props.type === 1) && (<span className={"author_chat"}>{props.name}</span>)}
            </div> : videoCall != null || audioCall != null || audioCallFailed == true || videoCallFailed == true ? <div className={`message_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`} onClick={()=>handelJoinVideoCall(videoCall != null ? videoCall : audioCall)}>
                {props.name !== myName && <div className="message_avatar">
                    <img src={urlAvatar} alt=""/>
                    {/*<img src="data:image/jpeg;base64,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" alt=""/>*/}
                </div>}
                <div className={'flex-container d-flex video_call-wrapper'}>
                    <div className={`ic_video_call ${videoCallFailed== true || audioCallFailed == true ? 'ic_bg-red':''}`}>
                        {getIconCall()}
                        {(audioCallFailed == true || videoCallFailed==true) && <i className="bi bi-x call_failed" style={videoCallFailed ?{left: '25%', color: '#FF4842', top: '30%'}: {}}></i>}
                    </div>
                    <div className="main-content">
                        {props.type === 1 && <h4>{videoCall != null ? "Nhóm chat video": "Cuộc gọi thoại nhóm"} </h4>}
                        {/*{(props.type === 0) && <h4>{videoCall != null ? "Cuộc gọi video": "Cuộc gọi thoại"} </h4>}*/}
                        {(props.type === 0) && <h4>{getTitleCall()} </h4>}
                        <h5>{props.type === 1 ? 'Nhấn để tham gia' : getTimeHourAndMinute(props.createAt)}</h5>
                    </div>
                </div>
                {(props.name !== myName &&props.type === 1) && (<span className={"author_chat"}>{props.name}</span>)}
            </div> : isLink(mesText) ? <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                    {props.name !== myName && <div className="message_avatar">
                        <img src={urlAvatar} alt=""/>
                        {/*<img src="data:image/jpeg;base64,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" alt=""/>*/}
                    </div>}
                    <div className={`message_link`}>
                    <LinkPreview isMyChat={props.name === myName} url={mesText}/>
                </div>
                    {(props.name !== myName &&props.type === 1) && (<span className={"author_chat"}>{props.name}</span>)}
            </div> :
                getMessage() != null ? <p className={"mes_call"}>{getMessage()}</p> : <div style={{display: mesText === ''? "none": "flex"}} className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                    {props.name !== myName && <div className="message_avatar">
                        <img src={urlAvatar} alt=""/>
                    </div>}
                 <div
                    className={`message_item message_item-round ${props.name === myName ? "message_item-bgBlue" : "message_item-bgWhite"}`}>
                    <span className={`msg ${props.name === myName ? "message-myMessage" : "message-peopleMessage"}`}>{convertEntitiesToEmoji(mesText)}</span>
                     {(props.name !== myName &&props.type === 1) && (<span className={"author_chat"}>{props.name}</span>)}
                </div>
            </div>
            }
            {showImageDetail ? <div className={"image_detail-container"}>
                <img src={imgDetail} alt=""/>
                <div className={'ic_close'} onClick={closeImageDetail}><i className="bi bi-x-circle"></i></div>
                <div className={'ic_download'} onClick={dowloadImage}><i className="bi bi-download"></i></div>
            </div> : <></>}
            {showVideoDetail ? <div className={"image_detail-container"}>
                <video controls>
                    <source src={video} type={"video/mp4"} onDoubleClick={setURLVideoDetail}/>
                </video>
                <div className={'ic_close'} onClick={closeImageDetail}><i className="bi bi-x-circle"></i></div>
                <div className={'ic_download'} onClick={dowloadImage}><i className="bi bi-download"></i></div>
            </div> : <></>}
        </div>
    )

}

export default MessageItem;
import React, {useState} from "react";
import "./message_item.scss";
import {useDispatch, useSelector} from "react-redux";
import {saveAs} from 'file-saver';
import {HEADER_MSG_VIDEO} from "../../util/constants";
import {
    getMeetingRoom,
    getURLVideo,
    isJoinRoomMeeting,
    isLeaveRoomMeeting, isLink, isMeetingEnd,
    isRejectRoomMeeting,
    isVideoCall
} from "../../util/function";
import {setMeetingRoom} from "../../store/actions/meetingAction";
import {getMeetingAndToken, getRoom} from "../../service/VideoCallService";
import LinkPreview from "../link_review/link_preview";

function MessageItem(props) {
    const nameChat = useSelector(state => state.userReducer.currentChat.name);
    const myName = useSelector(state => state.userReducer.username);
    const meetingRoom =useSelector(state => state.meetingReducer.meetingRoom);
    let listImg = props.isJson ? JSON.parse(props.mes).imgs : [];
    let mesText = props.isJson ? JSON.parse(props.mes).text : props.mes;
    const [imgDetail, setImgDetail] = useState('');
    const [videoDetail, setVideoDetail] = useState('');
    const [showImageDetail, setShowImageDetail] = useState(false);
    const [showVideoDetail, setShowVideoDetail] = useState(false);
    const video = getURLVideo(mesText);
    const videoCall = isVideoCall(mesText) ? getMeetingRoom(mesText): null;
    const dispatch = useDispatch();
    const setURLImageDetail = (e) => {
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
    const getMessage = () => {
        const owner = (props.name === myName ? 'Bạn ':props.name)
        if(isMeetingEnd(mesText)) return ' Cuộc gọi video đã kết thúc.';
        if(isRejectRoomMeeting(mesText)) return  owner + ' đã từ chối tham gia đoạn chat video.';
        if(isJoinRoomMeeting(mesText)) return owner + ' đã tham gia đoạn chat video.';
        if(isLeaveRoomMeeting(mesText)) return owner + ' đã rời khỏi đoạn chat video.';
        return  null;
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
            }
        } );
    }
    return (
        <div>
            <div className={`image_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div className={'flex-container d-flex'}>
                    {listImg.map((img, index) => <div key={index} className={"image_item"}><img src={img} alt="" onClick={setURLImageDetail}/></div>)}
                </div>
            </div>
            {video !== '' ? <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div
                    className={`message_item-video message_item-video-round`}>
                    <video controls>
                        <source src={video} type={"video/mp4"}/>
                    </video>
                </div>
            </div> : videoCall != null ? <div className={`message_container d-flex ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`} onClick={()=>handelJoinVideoCall(videoCall)}>
                <div className={'flex-container d-flex video_call-wrapper'}>
                    <div className="ic_video_call"><i className="fa-solid fa-video"></i></div>
                    <div className="main-content">
                        <h4>Nhóm chat video</h4>
                        <h5>Nhấn để tham gia</h5>
                    </div>
                </div>
            </div> : isLink(mesText) ? <div className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                <div className={`message_link`}>
                    <LinkPreview isMyChat={props.name === myName} url={mesText}/>
                </div>
            </div> :
                getMessage() != null ? <p className={"mes_call"}>{getMessage()}</p> : <div style={{display: mesText === ''? "none": "flex"}} className={`message_container ${props.name === myName ? 'message_container-flexRight':'message_container-flexleft'}`}>
                    {props.name !== myName && <div className="message_avatar">
                        <img src="data:image/jpeg;base64,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" alt=""/>
                    </div>}
                 <div
                    className={`message_item message_item-round ${props.name === myName ? "message_item-bgBlue" : "message_item-bgWhite"}`}>
                    <span className={`msg ${props.name === myName ? "message-myMessage" : "message-peopleMessage"}`}>{mesText}</span>
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